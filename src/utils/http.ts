import Axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios'
import router from '@/router'
import store from '@/store'
import Cookie from './cookie'
import utils from './utils'
import UserInfoDto from '@/types/UserInfoDto'
import cookie from './cookie'

const config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}
const axios = Axios.create(config)
axios.interceptors.request.use(
  (configure) => {
    // Do something before request is sent
    const auth = Cookie.get('Authorization')
    if (auth !== null) {
      configure.headers.Authorization = 'Bearer ' + auth
    }
    return configure
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)
// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error)
  }
)
const ReLogin = (): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    Cookie.del('Authorization')
    const logincookie = Cookie.decryptGet('Login')
    if (logincookie === null) {
      RedirectToLogin()
    } else {
      const ciphertext = utils.encryptString(logincookie, utils.serverkey)
      axios
        .post(hosturl + '/api/token/encrypt', { ciphertext })
        .then((respost) => {
          Cookie.set('Authorization', respost.data, 0)
          getUserInfo()
            .then((resget) => {
              resolve(respost)
            })
            .catch((errget) => {
              reject(errget)
            })
        })
        .catch((errpost) => {
          RedirectToLogin()
          reject(errpost)
        })
    }
  })
}
const RedirectToLogin = () => {
  Cookie.del('Login')
  utils.cleanLoginStatus()
  if (router.currentRoute.path !== '/login') {
    router.replace({
      path: '/login',
      query: { redirect: router.currentRoute.fullPath },
    })
  }
}
const getUserInfo = (): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    Get(hosturl + '/api/user/me')
      .then((res) => {
        utils.saveLoginStatus(res.data as UserInfoDto)
        resolve(res)
      })
      .catch((err) => {
        cookie.del('Authorization')
        cookie.del('Login')
        utils.cleanLoginStatus()
        reject(err)
      })
  })
}
const logout = (): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .delete(hosturl + '/api/token')
      .then((res) => {
        cookie.del('Authorization')
        cookie.del('Login')
        utils.cleanLoginStatus()
        router.push('/login')
        resolve(res)
      })
      .catch((err) => {
        if (err.response.status === 401 || err.response.status === 403) {
          cookie.del('Authorization')
          cookie.del('Login')
          utils.cleanLoginStatus()
          router.push('/login')
        }
        reject(err)
      })
  })
}
const Execute = (
  action: (url: string, data?: any, config?: AxiosRequestConfig | undefined) => AxiosPromise<any>,
  url: string,
  data?: any,
  configure?: AxiosRequestConfig | undefined
): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    action(url, data, configure)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401) {
            ReLogin()
              .then(() => {
                action(url, data, configure)
                  .then((res2) => {
                    resolve(res2)
                  })
                  .catch((err2) => {
                    reject(err2)
                  })
              })
              .catch((errRelogin) => {
                reject(errRelogin)
              })
          } else if (err.response.status === 403) {
            Cookie.del('Authorization')
            RedirectToLogin()
          } else {
            reject(err)
          }
        } else {
          reject(err)
        }
      })
  })
}

const hosturl = 'http://localhost:2619'
const Get = (url: string, configure?: AxiosRequestConfig | undefined) => {
  return Execute(axios.get, url, configure)
}
const Post = (url: string, data?: any, configure?: AxiosRequestConfig | undefined) => {
  return Execute(axios.post, url, data, configure)
}
const Put = (url: string, data?: any, configure?: AxiosRequestConfig | undefined) => {
  return Execute(axios.put, url, data, configure)
}
const Patch = (url: string, data?: any, configure?: AxiosRequestConfig | undefined) => {
  return Execute(axios.patch, url, data, configure)
}
const Delete = (url: string, configure?: AxiosRequestConfig | undefined) => {
  return Execute(axios.delete, url, configure)
}

class Http {
  public readonly hosturl: string
  public readonly Get: (url: string, config?: AxiosRequestConfig | undefined) => Promise<AxiosResponse>
  public readonly Post: (url: string, data?: any, config?: AxiosRequestConfig | undefined) => Promise<AxiosResponse>
  public readonly Put: (url: string, data?: any, config?: AxiosRequestConfig | undefined) => Promise<AxiosResponse>
  public readonly Patch: (url: string, data?: any, config?: AxiosRequestConfig | undefined) => Promise<AxiosResponse>
  public readonly Delete: (url: string, data?: any, config?: AxiosRequestConfig | undefined) => Promise<AxiosResponse>
  public readonly ReLogin: () => Promise<AxiosResponse>
  public readonly getUserInfo: () => Promise<AxiosResponse>
  public readonly logout: () => Promise<AxiosResponse>
  constructor() {
    this.hosturl = hosturl
    this.Get = Get
    this.Post = Post
    this.Put = Put
    this.Patch = Patch
    this.Delete = Delete
    this.ReLogin = ReLogin
    this.getUserInfo = getUserInfo
    this.logout = logout
  }
}
export default new Http()
