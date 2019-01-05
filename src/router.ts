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
        title: '登录'
      }
    },
    {
      path: '/home',
      name: 'home',
      // beforeEnter: guard,
      component: Home,
      meta: {
        title: '首页'
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
        title: '关于'
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
