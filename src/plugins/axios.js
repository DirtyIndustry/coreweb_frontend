'use strict'

import Vue from 'vue'
import axios from 'axios'
import Cookie from '@/utils/cookie'
import router from '@/router'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    if (Cookie.get('Authorization')) {
      config.headers.Authorization = 'Bearer ' + Cookie.get('Authorization')
    }
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response
  },
  function(error) {
    // Do something with response error
    if (error.response.status === 401 | error.response.status === 403) {
      Cookie.del('Authorization')
      router.replace({
        path: '/login',
        query: {redirect: router.currentRoute.fullPath}
      })
    }
    return Promise.reject(error)
  }
)

Plugin.install = function(Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios
      }
    },
    $axios: {
      get() {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
