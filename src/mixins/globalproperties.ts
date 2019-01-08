import { Component, Vue } from 'vue-property-decorator'
import UserInfoDto from '@/types/UserInfoDto'

declare module 'vue/types/vue' {
  interface Vue {
    loggedin: boolean
    myinfo: UserInfoDto
  }
}

@Component
export default class GlobalProperties extends Vue {
  get loggedin() {
    return this.$store.state.loggedin
  }
  set loggedin(value: boolean) {
    this.$store.dispatch('setLoggedIn', value)
  }
  get myinfo() {
    return this.$store.state.myinfo
  }
  set myinfo(value: UserInfoDto) {
    this.$store.dispatch('setMyInfo', value)
  }
}
