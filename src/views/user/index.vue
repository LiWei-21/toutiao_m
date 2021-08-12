<template>
  <div class="user-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      :title="uesrInfo.name"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="user-info">
      <div class="base-info">
        <van-image class="avatar" round fit="cover" :src="uesrInfo.photo" />
        <div class="right-area">
          <div class="stats-wrap">
            <div class="stats-item">
              <span class="count">{{ uesrInfo.art_count }}</span>
              <span class="text">发布</span>
            </div>
            <div class="stats-item">
              <span class="count">{{ uesrInfo.follow_count }}</span>
              <span class="text">关注</span>
            </div>
            <div class="stats-item">
              <span class="count">{{ uesrInfo.fans_count }}</span>
              <span class="text">粉丝</span>
            </div>
            <div class="stats-item">
              <span class="count">{{ uesrInfo.like_count }}</span>
              <span class="text">获赞</span>
            </div>
          </div>
          <van-button
            :class="uesrInfo.is_following ? 'follow-btn1' : 'follow-btn'"
            @click="followUser"
            :loading="loading"
            >关注</van-button
          >
        </div>
      </div>
      <div class="label-info">
        <div class="bio-wrap">
          <span class="label">简介：</span>
          <span class="text">{{ uesrInfo.intro }}</span>
        </div>
      </div>
    </div>
    <!-- 文章列表 -->
    <article-list ref="article-list" :userId="userId" :type="'user'" />
    <!-- 文章列表 -->
  </div>
</template>

<script>
import { getUserInfo, addFollowed, deleteFollowed } from '@/api/User'
import ArticleList from '../home/components/article-list.vue'
export default {
  name: 'UserIndex',
  components: { ArticleList },
  props: {
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      uesrInfo: {},
      userArticles: [],
      loading: false
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getUserInfo()
  },
  mounted() {},
  methods: {
    async getUserInfo() {
      try {
        const { data } = await getUserInfo(this.userId)
        // console.log(data)
        this.uesrInfo = data.data
      } catch (error) {
        console.log('获取信息失败', error)
      }
    },
    async followUser() {
      this.loading = true
      if (this.uesrInfo.is_following) {
        try {
          const { data } = await deleteFollowed(this.userId)
          console.log(data)
          this.$toast.success('取消关注成功')
          this.uesrInfo.is_following = !this.uesrInfo.is_following
        } catch (err) {
          this.$toast.fail('取消关注失败')
        }
      } else {
        try {
          const { data } = await addFollowed(this.userId)
          console.log(data)
          this.$toast.success('关注成功')
          this.uesrInfo.is_following = !this.uesrInfo.is_following
        } catch (err) {
          let message = '关注失败'
          if (err.response.status === 400) {
            message = '不能关注自己'
          }
          this.$toast.fail(message)
          console.log(err)
        }
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.user-container {
  .user-info {
    background-color: #fff;
    padding: 25px 32px;
    .base-info {
      display: flex;
      margin-bottom: 25px;
      .avatar {
        width: 155px;
        height: 155px;
        margin-right: 62px;
      }
    }
    .label-info {
      font-size: 25px;
      .bio-wrap {
        .label {
          color: #646263;
        }
        .text {
          color: #212121;
        }
      }
    }
  }
  .right-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .stats-wrap {
      display: flex;
      justify-content: space-between;
      .stats-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .count {
          font-size: 26px;
          color: #0d0a10;
        }
        .text {
          font-size: 21px;
          color: #9c9b9d;
        }
      }
    }
    .follow-btn {
      width: 289px;
      height: 55px;
      line-height: 55px;
      background-color: #6bb5ff;
      color: #fff;
      border: none;
    }
    .follow-btn1 {
      width: 289px;
      height: 55px;
      line-height: 55px;
      border: none;
      background-color: rgb(163, 155, 155);
      color: #fff;
    }
  }
}
</style>
