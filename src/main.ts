import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import cookie from './utils/cookie'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.fullPath === '/login') {
    if (cookie.get('Authorization') !== null) {
      next('/home')
    } else {
      next()
    }
  } else if (cookie.get('Authorization') === null) {
    next('/login')
  } else {
    next()
  }
  // window.document.title = to.meta.title
  // next()
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
