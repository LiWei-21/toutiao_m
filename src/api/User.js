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
// 添加关注用户

export const addFollowed = target => {
  return request({
    method: 'POST',
    url: `/app/v1_0/user/followings`,
    data: { target }
  })
}

// 取消关注用户

export const deleteFollowed = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${target}`
  })
}

// 添加收藏

export const addCollect = target => {
  return request({
    method: 'POST',
    url: `/app/v1_0/article/collections`,
    data: { target }
  })
}

// 取消收藏

export const deleteCollect = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${target}`
  })
}

// 添加点赞

export const addLike = target => {
  return request({
    method: 'POST',
    url: `/app/v1_0/article/likings`,
    data: { target }
  })
}

// 取消点赞

export const deleteLike = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${target}`
  })
}

// 获取用户个人资料

export const getUserProfile = target => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}

// 编辑用户个人资料

export const updateUserProfile = target => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile'
  })
}

// 编辑用户照片资料

export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data
  })
}
