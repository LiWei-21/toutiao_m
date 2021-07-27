<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">
        我的频道
      </div>
      <van-button
        class="edit-btn"
        type="danger"
        size="mini"
        round
        plain
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}
      </van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        :text="channel.name"
        :key="index"
        v-for="(channel, index) in mychannels"
        @click="removeOrAtciveChannel(channel, index)"
      >
        <van-icon
          v-show="isEdit && !notDelete.includes(channel.id)"
          slot="icon"
          name="clear"
        ></van-icon>
        <span slot="text" :class="{ active: active === index }" class="text">
          {{ channel.name }}
        </span>
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">
        推荐频道
      </div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in onAllChannells"
        :key="index"
        icon="plus"
        :text="channel.name"
        @click="addChannels(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannelList,
  addMyChannelList,
  deleteMyChannelList
} from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    mychannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isEdit: false,
      allChannels: [],
      notDelete: [0]
    }
  },
  computed: {
    // 处理推荐频道除掉我的频道里的频道
    onAllChannells() {
      return this.allChannels.filter(item => {
        return !this.mychannels.find(myitem => {
          return myitem.id === item.id
        })
      })
      // 方法一
      // var channels = []
      // this.allChannels.forEach(channel => {
      //   const ret = this.mychannels.find(
      //     myChannel => {
      //       return myChannel.id === channel.id
      //     }
      //   )
      //   if (!ret) {
      //     channels.push(channel)
      //   }
      // })
      // return channels
    },
    ...mapState(['token'])
  },
  watch: {},
  created() {
    this.getAllchannels()
  },
  mounted() {},
  methods: {
    // 获取全部频道
    async getAllchannels() {
      try {
        const { data } = await getAllChannelList()
        this.allChannels = data.data.channels
        console.log(data)
      } catch (err) {
        console.log('获取失败')
      }
    },
    // 添加频道
    async addChannels(channel) {
      // 先提交到我们频道数组中
      this.mychannels.push(channel)
      if (this.token) {
        // 已登录，数据存储到线上
        try {
          const { data } = await addMyChannelList([
            {
              id: channel.id, // 频道 id
              seq: this.mychannels.length // 频道的 序号
            }
          ])
          console.log(data)
        } catch (err) {
          console.log(err)
          this.$toast('添加失败')
        }
      } else {
        // 未登录，数据存储到本地
        setItem('Toutiao_channels', this.mychannels)
      }
    },
    async removeOrAtciveChannel(channel, index) {
      // 判断是不是处于编辑状态
      if (this.isEdit) {
        // 处于编辑状态
        // 判断是不是不允许删除的判断
        if (this.notDelete.includes(index)) {
          return
        }
        // 判断删除的是不是选中的频道的前面 -----以防选中的频道发布变化---向后移动
        if (this.active >= index) {
          this.$emit('update-active', this.active - 1)
        }
        this.mychannels.splice(index, 1)
        // 频道数据永久化
        if (this.token) {
          // 已登录，将数据存储到线上
          try {
            const { data } = await deleteMyChannelList(channel.id)
            console.log(data)
          } catch (err) {
            console.log(err)
            this.$toast('删除失败')
          }
        } else {
          // 未登录，将数据存储到本地
          setItem('Toutiao_channels', this.mychannels)
        }
      } else {
        this.$emit('update-active', index)
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;

  .title-text {
    font-size: 32px;
    color: #333333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
