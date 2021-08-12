<template>
  <div class="my-container">
    <div v-if="token" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" :src="userInfo.photo" round />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round to="user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item" @click="toUser">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div
          class="data-item"
          @click="
            $router.push({
              name: 'hiscoll',
              params: {
                userId: userInfo.id,
                t: 'coll'
              }
            })
          "
        >
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">收藏</span>
        </div>
      </div>
    </div>

    <!-- 未登录的头部状态 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" />
        <span class="text">登录/注册</span>
      </div>
    </div>
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item
        class="grid-item"
        @click="
          $router.push({
            name: 'hiscoll',
            params: {
              userId: userInfo.id,
              t: 'coll'
            }
          })
        "
      >
        <i slot="icon" class="toutian toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item
        class="grid-item"
        @click="
          $router.push({
            name: 'hiscoll',
            params: {
              userId: userInfo.id,
              t: 'his'
            }
          })
        "
      >
        <i slot="icon" class="toutian toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" class="mb-9" is-link />
    <van-cell
      v-if="token"
      class="logout-cell"
      clickable
      title="退出登录"
      @click="onLogout"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { userInfo } from '@/api/User.js'
// import { removeItem } from '@/utils/storage.js'

export default {
  name: 'MyIndex',
  data() {
    return {
      userInfo: {}
    }
  },
  components: {},
  computed: {
    ...mapState(['token'])
  },
  methods: {
    // 退出登录
    onLogout() {
      // 调用Dialog时要改成this.$dialog
      this.$dialog
        .confirm({
          title: '确定退出登录吗'
        })
        .then(() => {
          // on confirm
          // 清除vux和本机储存的登录令牌
          this.$store.commit('setToken', null)
          // 删除本机token
          // removeItem('Toutiao_User')
        })
        .catch(() => {
          // on cancel
        })
    },
    // 获取用户信息
    async getUserInfo() {
      // console.log(window.localStorage.getItem('Toutiao_User').token)
      try {
        const { data } = await userInfo()
        this.userInfo = data.data
        console.log(data)
      } catch (err) {
        if (err.request.status === 401) {
          this.$toast.fail('获取信息错误，请重新登入')
        } else {
          this.$toast.fail('获取信息失败')
        }
      }
    },
    toUser() {
      this.$router.push({
        name: 'user',
        params: {
          userId: this.userInfo.id
        }
      })
    }
  },
  created() {
    if (this.token) {
      this.getUserInfo()
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .header {
    height: 361px;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }

  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
          margin-right: 23px;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }

  .grid-nav {
    .grid-item {
      height: 141px;
      i.toutian {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }

  .logout-cell {
    text-align: center;
    color: #d86262;
  }

  .mb-9 {
    margin-bottom: 9px;
  }
}
</style>
