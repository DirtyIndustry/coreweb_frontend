import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

// const guard = (to: Route,
//                from: Route,
//                next: (to?: string|false|void|Location|((vm: Vue) => any)|undefined) => void) => {
//   next()
// }

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      // beforeEnter: guard,
      component: () => import ('./views/Login.vue'),
      meta: {
        title: '登录',
        requireToken: false
      }
    },
    {
      path: '/home',
      name: 'home',
      // beforeEnter: guard,
      component: Home,
      meta: {
        title: '首页',
        requireToken: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/CompanyRegister.vue'),
      meta: {
        title: '新公司注册',
        requireToken: false
      }
    },
    {
      path: '/about',
      name: 'about',
      // beforeEnter: guard,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        title: '关于',
        requireToken: true
      }
    },
    { /* Not Found 路由，必须是最后一个路由 */
      path: '*',
      component: () => import('./views/NotFound.vue'),
      meta: {
        title: '找不到页面'
      }
    }
  ]
})
