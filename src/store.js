import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
Vue.use(Vuex)

const token = 'Toutiao_User'

export default new Vuex.Store({
  state: {
    // 用户的登录状态信息
    token: getItem(token)
  },
  mutations: {
    setToken(state, obj) {
      // 将token保存到Vuex中可 1 获取方便 2 响应式的
      state.token = obj
      // 将登入token存入本机已达到长期储存 持久化
      // 为了使以后获取本机储存的token跟方便且模块化将window.localStorage封装
      // window.localStorage.setItem(token, JSON.stringify(obj))
      setItem(token, obj)
    }
  },
  actions: {}
})
