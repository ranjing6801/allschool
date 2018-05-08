import Vue from 'vue'
import App from './App'
import router from './router/router'
import VueWechatTitle from 'vue-wechat-title';  

import axios from 'axios'
import {store} from './store/store.js'

Vue.use(VueWechatTitle)



// 配置默认的根路径

axios.defaults.baseURL = 'https://school-test.xiaoheiban.cn'
Vue.prototype.axios = axios
axios.defaults.withCredentials = true

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
