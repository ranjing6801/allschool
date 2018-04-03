import Vue from 'vue'
import App from './App'
import router from './router/router'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'

import axios from 'axios'
import {store} from './store/store.js'



// 配置默认的根路径
axios.defaults.baseURL = 'https://wd4470790358qgvmkp.wilddogio.com/'

Vue.use(Mint)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
