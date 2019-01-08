import Vue from 'vue'
import Vuex from 'vuex'
import UserInfoDto from '@/types/UserInfoDto'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedin: false,
    myinfo: new UserInfoDto()
  },
  mutations: {
    setloggedin(state, value: boolean) {
      state.loggedin = value
    },
    setmyinfo(state, value: UserInfoDto) {
      state.myinfo = value
    }
  },
  actions: {
    setLoggedIn(context, value: boolean) {
      context.commit('setloggedin', value)
    },
    setMyInfo(context, value: UserInfoDto) {
      context.commit('setmyinfo', value)
    }
  }
})
