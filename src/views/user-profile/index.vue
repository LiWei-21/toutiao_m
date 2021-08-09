<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- input 的type属性值为file 则是上传文件 hidden 属性是隐藏显示 ref 引用获取DOM -->
    <input type="file" hidden ref="file" @change="onChangePhoto" />

    <van-cell
      class="avatar-cell"
      title="头像"
      is-link
      center
      @click="$refs.file.click()"
    >
      <van-image round class="avatar" fit="cover" :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isUpdateNamePop = true"
    />
    <van-cell
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
      @click="isUpdateGenderPop = true"
    />
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isUpdateBirthdayPop = true"
    />

    <!-- 修改昵称 -->
    <van-popup
      v-model="isUpdateNamePop"
      style="height: 100%;"
      position="bottom"
    >
      <update-name
        v-if="isUpdateNamePop"
        v-model="user.name"
        @close="isUpdateNamePop = false"
      />
    </van-popup>

    <!-- 修改性别 -->
    <van-popup v-model="isUpdateGenderPop" position="bottom">
      <update-gender
        v-if="isUpdateGenderPop"
        v-model="user.gender"
        @close="isUpdateGenderPop = false"
      />
    </van-popup>

    <!-- 修改生日 -->
    <van-popup v-model="isUpdateBirthdayPop" position="bottom">
      <update-birthday
        v-if="isUpdateBirthdayPop"
        v-model="user.birthday"
        @close="isUpdateBirthdayPop = false"
      />
    </van-popup>

    <!-- 修改生日 -->
    <van-popup
      v-model="isUpdatePhotoPop"
      style="height: 100%;"
      position="bottom"
    >
      <update-photo
        :img="img"
        @close="isUpdatePhotoPop = false"
        @update-photo="user.photo = $event"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/User'
import UpdateName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'
import UpdatePhoto from './components/update-photo.vue'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  props: {},
  data() {
    return {
      user: {},
      isUpdateNamePop: false,
      isUpdateGenderPop: false,
      isUpdateBirthdayPop: false,
      isUpdatePhotoPop: false,
      img: null
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getUserProfile()
  },
  mounted() {},
  methods: {
    async getUserProfile() {
      try {
        const { data } = await getUserProfile()
        // console.log(data)
        this.user = data.data
      } catch (err) {
        this.$toast('获取个人信息失败')
      }
    },
    onChangePhoto() {
      // 获取文件对象
      const file = this.$refs.file.files[0]

      // 基于文章对象获取 blob 数据
      this.img = window.URL.createObjectURL(file)

      // 展示预览图片弹出层
      this.isUpdatePhotoPop = true

      // file-input 如果选了同一个文件不会触发 change 事件
      // 解决办法就是每次使用完毕，把它的 value 清空
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.user-profile {
  .avatar-cell {
    .van-cell__value {
      display: flex;
      flex-direction: row-reverse;
    }
    .avatar {
      width: 60px;
      height: 60px;
    }
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
