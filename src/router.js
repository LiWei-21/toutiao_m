import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login')
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
    }
  ]
})
