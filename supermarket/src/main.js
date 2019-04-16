import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入 local 文件
import local from '@/utils/local'
//引入axios
import request from './utils/request'
//把request挂载在Vue的原型上
Vue.prototype.request=request;

//引入echarst
import echarts from 'echarts'
Vue.prototype.echarts=echarts;


// 引入element-ui 和 注册
import ElementUI from 'element-ui' // 组件
import 'element-ui/lib/theme-chalk/index.css' // 样式
Vue.use(ElementUI) // 注册

//引入base.css
import './assets/css/base.css'

Vue.config.productionTip = false

// 路由守卫 拦截所有路由
router.beforeEach((to, from, next) => {
  // to: 要进入的目标路由对象  from: 当前导航正要离开的路由 next: 是一个函数 只要调用 才能进入下一步
  // 获取浏览器中的token
  const token = local.get('c_h_e_n');
  // 如果有token 直接放行
  if (token) {
     // 放行
    next()
  } else { 
    // 如果要去登录 放行
    if (to.path === '/login') {
      next()
    } else {
      // 如果想去其他界面 直接跳转到登录
      next('/login')
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
