import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedin: false
  },
  mutations: {
    setloggedin(state, value: boolean) {
      state.loggedin = value
    }
  },
  actions: {
    setLoggedIn(context, value: boolean) {
      context.commit('setloggedin', value)
    }
  }
})
