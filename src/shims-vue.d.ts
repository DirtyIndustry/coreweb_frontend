import Vue from 'vue'
import VueRouter from 'vue-router'
import { Route } from 'vue-router'
import { AxiosInstance } from 'axios'
import {
  ElMessageBox,
  ElMessageBoxShortcutMethod
} from 'element-ui/types/message-box'

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter
    $route: Route
    $axios: AxiosInstance
    $msgbox: ElMessageBox
    $alert: ElMessageBoxShortcutMethod
  }
}
