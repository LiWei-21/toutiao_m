import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入Vant ui组件
import Vant from 'vant'
// 导入Vant css
import 'vant/lib/index.css'

import './styles/index.less'

import 'amfe-flexible'
// 导入dayjs dayjs怎么处理时间
import './utils/dayjs'

// 挂在启用Vant
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
