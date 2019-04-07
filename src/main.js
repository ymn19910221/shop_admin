// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 引入路由
import router from './router/router.js'

// 引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入全局css
import './assets/css/common.css'

// 引入axios 解决axios问题
import axios from 'axios'
// 1. 解决axios基路径问题
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 2. 引入axios 后面插件可以不需引入 使用this.$axios就好
Vue.prototype.$axios = axios
// 3. 引入token 后面再发axios 不需要再添加请求头  null 可以了省略
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

// 安装一下Element-ui
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 挂载路由
  router,
  components: { App },
  template: '<App/>'
})
