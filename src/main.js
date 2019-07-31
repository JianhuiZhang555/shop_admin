import Vue from 'vue'
// 自动引入根组件，显示页面
import App from './App.vue'

// 引用路由实例，挂载
import router from './router'

// 全局使用element UI组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入公共样式
import './assets/common.css'

// 全局设置基准接口
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 每个组件都要使用axios，全局引入
Vue.prototype.$axios = axios

// 全局设置token令牌
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  return Promise.reject(error)
})

// 使用Vue.use安装
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
