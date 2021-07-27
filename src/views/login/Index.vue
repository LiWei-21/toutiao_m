<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登入/注册">
      <van-icon slot="left" name="cross" @click="$router.back()" />
    </van-nav-bar>
    <!-- 登录表单 -->
    <!--
      表单验证：
        1、给 van-field 组件配置 rules 验证规则
          参考文档：https://youzan.github.io/vant/#/zh-CN/form#rule-shu-ju-jie-gou
        2、当表单提交的时候会自动触发表单验证
           如果验证通过，会触发 submit 事件
           如果验证失败，不会触发 submit
     -->
    <van-form @submit="onSubmit" ref="loginFormRef">
      <van-field
        v-model="User.mobile"
        type="number"
        name="mobile"
        maxlength="11"
        placeholder="手机号"
        :rules="rules.userName"
      >
        <i slot="left-icon" class="toutian toutiao-shouji" />
      </van-field>
      <van-field
        v-model="User.code"
        type="number"
        name="code"
        maxlength="6"
        placeholder="验证码"
        :rules="rules.code"
      >
        <i slot="left-icon" class="toutian toutiao-yanzhengma" />

        <template #button>
          <van-count-down
            v-if="isCountDown"
            :time="time"
            format="ss s"
            @finish="isCountDown = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            size="small"
            round
            type="default"
            native-type="button"
            @click="onSendSmsCode"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="submitBox">
        <van-button class="submitBtn" block type="info" native-type="submit"
          >登入</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/User'
export default {
  name: 'LoginIndex',
  data() {
    return {
      User: {
        mobile: '',
        code: ''
      },
      rules: {
        userNmae: [
          { required: true, message: '请填写手机号', trigger: onblur },
          {
            pattern: /^1[3|5|7|8|9]\d{9}/,
            message: '请填写合法的手机号',
            trigger: onblur
          }
        ],
        code: [
          {
            required: true,
            message: '请填写验证码',
            trigger: onblur
          }
        ]
      },
      time: 1000 * 60,
      isCountDown: false
    }
  },
  methods: {
    async onSubmit() {
      // 1 提示用户正在登入
      // 使用Toast 调用时用$toast
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '加载中...', // Toast轻提示
        forbidClick: true // 开启背景点击禁用
      })

      // 验证登入账号
      // 当try{} 里面的代码执行不报错时则会执行try里面的代码反之执行catch中的代码
      try {
        const { data } = await login(this.User)
        // Toast 当发起一个新的提示时会直接结束上一个提示
        this.$toast.success('登入成功')
        // 将登录令牌token保存到Vuex中 发起mutations
        this.$store.commit('setToken', data.data)
        console.log(data)
        // 转到个人中心
        this.$router.back()
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDown = false
        if (err.response.status === 400) {
          this.$toast.fail('用户名或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后再试')
        }
      }
    },
    async onSendSmsCode() {
      // 验证手机号是否符合格式
      // 当try{} 里面的代码执行不报错时则会执行try里面的代码反之执行catch中的代码
      try {
        await this.$refs.loginFormRef.validate('mobile')
        // 验证成功显示倒计时
        this.isCountDown = true
      } catch (err) {
        // 验证失败提示用户
        return this.$toast.fail('验证手机号失败')
      }
      // 发送验证码
      try {
        await getSmsCode(this.User.mobile)
        this.$toast.success('验证码发送成功')
      } catch (err) {
        if (err.response.status === 429) {
          this.$toast.fail('发送验证码过于频繁，请稍后再试')
        } else {
          this.$toast.fail('发送验证码错误，请稍后再试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .toutian {
    font-size: 37px;
    border: none;
  }
  .submitBox {
    margin: 55px 33px;
    .submitBtn {
      background-color: #6db4fb;
      border: none;
    }
  }
  .send-sms-btn {
    height: 50px;
    font-size: 22px;
    color: #666666;
    background-color: #ededed;
    line-height: 49.3px;
  }
}
</style>
