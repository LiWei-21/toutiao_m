import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Index.vue')
    },
    {
      path: '/',
      // name: 'layout', // 报警告 因为设置了默认子路由，所以没有设置name的必要了
      component: () => import('@/views/layout'),
      children: [
        {
          path: '', // 默认子路由
          name: 'home',
          component: () => import('@/views/home')
        },
        {
          path: 'qa',
          name: 'qa',
          component: () => import('@/views/qa')
        },
        {
          path: 'video',
          name: 'video',
          component: () => import('@/views/video')
        },
        {
          path: 'my',
          name: 'my',
          component: () => import('@/views/my')
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/search')
    },
    {
      path: '/article/:articleId',
      name: 'article',
      component: () => import('@/views/article'),
      props: true
    },
    {
      path: '/user/profile',
      name: 'user-profile',
      component: () => import('@/views/user-profile')
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: () => import('./views/user'),
      props: true
    },
    {
      path: '/hc/:userId&:t',
      name: 'hiscoll',
      component: () => import('./views/my/components/histories-collection.vue'),
      props: true
    }
  ]
})
