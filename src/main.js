import Vue from 'vue'
import App from './App'
import router from './router/router'

import axios from 'axios'
import {store} from './store/store.js'



// 配置默认的根路径

axios.defaults.baseURL = 'http://school-dev.xiaoheiban.cn'
Vue.prototype.axios = axios

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
