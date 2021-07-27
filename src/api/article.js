import request from '@/utils/request'

// 获取用户频道列表

export const getArticleList = params => {
  return request({
    method: 'GET',
    url: `/app/v1_1/articles`,
    params
  })
}
