// 用户相关的请求模块

import request from '@/utils/request'

// 获取联想建议（自动补全）

export const getSearchSuggenestions = q => {
  return request({
    method: 'GET',
    url: `/app/v1_0/suggestion`,
    params: {
      q
    }
  })
}

// 获取联想建议（自动补全）

export const getSearchResults = params => {
  return request({
    method: 'GET',
    url: `/app/v1_0/search`,
    params
  })
}
