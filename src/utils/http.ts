import Axios, { AxiosRequestConfig, AxiosError, AxiosPromise, AxiosResponse } from 'axios'
import router from '@/router'
import Cookie from './cookie'
import LoginDto from '@/types/LoginDto'

const config = {
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
}
const axios = Axios.create(config)
axios.interceptors.request.use(
    (configure) => {
        // Do something before request is sent
        if (Cookie.get('Authorization')) {
            configure.headers.Authorization = 'Bearer ' + Cookie.get('Authorization')
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
const ReLogin = () => {
    return new Promise((resolve, reject) => {
        Cookie.del('Authorization')
        const logincookie = Cookie.get('Login')
        if (logincookie === null) {
            RedirectToLogin()
        } else {
            const logindto: LoginDto = JSON.parse(unescape(logincookie))
            logindto.userName = unescape(logindto.userName)
            logindto.password = unescape(logindto.password)
            axios.post(hosturl + '/api/token', logindto)
                .then((respost) => {
                    Cookie.set('Authorization', respost.data, 0)
                    resolve()
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
    router.replace({
        path: '/login',
        query: { redirect: router.currentRoute.fullPath }
    })
}
const Execute = (action: (url: string, data?: any, config?: AxiosRequestConfig | undefined) => AxiosPromise<any>,
                 url: string,
                 data?: any,
                 configure?: AxiosRequestConfig | undefined): Promise<AxiosResponse> => {
    return new Promise((resolve, reject) => {
        action(url, data, configure)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
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
                } else {
                    reject(err)
                }
            })
    })
}

const hosturl = 'http://localhost:2509'
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
    constructor() {
        this.hosturl = hosturl
        this.Get = Get
        this.Post = Post
        this.Put = Put
        this.Patch = Patch
        this.Delete = Delete
    }
}
export default new Http()
