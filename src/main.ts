import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import cookie from './utils/cookie'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // if (to.fullPath === '/login') {
  //   if (cookie.get('Authorization') !== null) {
  //     window.document.title = '首页'
  //     next('/home')
  //   } else {
  //     window.document.title = to.meta.title
  //     next()
  //   }
  // } else if (cookie.get('Authorization') === null) {
  //   window.document.title = '登录'
  //   next('/login')
  // } else {
  //   window.document.title = to.meta.title
  //   next()
  // }
  if (to.path === '/login') {
    if (cookie.get('Authorization') !== null) {
      window.document.title = '首页'
      next('/home')
    } else {
      window.document.title = to.meta.title
      next()
    }
  } else if (to.meta.requireToken) {
    if (cookie.get('Authorization') === null) {
      window.document.title = '登录'
      next('/login')
    } else {
      window.document.title = to.meta.title
      next()
    }
  } else {
    window.document.title = to.meta.title
    next()
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
