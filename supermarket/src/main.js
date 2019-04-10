import Vue from 'vue'
import App from './App.vue'
import router from './router'

//引入axios
import request from './utils/request'
//把request挂载在Vue的原型上
Vue.prototype.request=request;

// 引入element-ui 和 注册
import ElementUI from 'element-ui' // 组件
import 'element-ui/lib/theme-chalk/index.css' // 样式
Vue.use(ElementUI) // 注册

//引入base.css
import './assets/css/base.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
