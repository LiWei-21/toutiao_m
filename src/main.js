import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入Vant ui组件
import Vant from 'vant'
// 导入Vant css
import 'vant/lib/index.css'

import './styles/index.less'

// 挂在启用Vant
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
