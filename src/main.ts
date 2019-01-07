import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import cookie from './utils/cookie'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.requireToken === true) {
    if (cookie.get('Authorization') === null) {
      window.document.title = '登录'
      next('/login')
    } else {
      window.document.title = to.meta.title
      next()
    }
  } else if (to.meta.requireToken === false) {
    if (cookie.get('Authorization') === null) {
      window.document.title = to.meta.title
      next()
    } else {
      window.document.title = '首页'
      next('/home')
    }
  } else if (to.meta.requireToken === undefined) {
    window.document.title = to.meta.title
    next()
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
