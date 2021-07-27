// 处理频道的Api

import request from '@/utils/request'

//  获取提交频道列表

export const getAllChannelList = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
//  添加我的频道列表

export const addMyChannelList = channels => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels
    }
  })
}
//  删除我的频道列表

export const deleteMyChannelList = channelsId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelsId}`
  })
}
