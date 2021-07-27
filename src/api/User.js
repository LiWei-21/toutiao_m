// 用户相关的请求模块

import request from '@/utils/request'
// import store from '@/store.js'

// 用户登入

export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 获取验证码

export const getSmsCode = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

// 获取用户信息

export const userInfo = () => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user`
    // headers: {
    //   Authorization: `Bearer ${store.state.token.token}`
    // }
  })
}

// 获取用户频道列表

export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user/channels`
  })
}
