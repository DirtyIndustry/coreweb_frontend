<template>
  <div id="app">
    <!-- <div id="nav">
            <router-link to="/home">Home</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/login">Login</router-link>
    </div>-->
    <HeaderBarAlt></HeaderBarAlt>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator'
import GlobalProperties from '@/mixins/globalproperties'
import HelloWorld from '@/components/HelloWorld.vue'
import HeaderBarAlt from '@/components/HeaderBarAlt.vue'
import cookie from '@/utils/cookie'
import http from '@/utils/http'
import UserInfoDto from '@/types/UserInfoDto'

@Component({
  components: {
    HelloWorld,
    HeaderBarAlt
  },
  mixins: [GlobalProperties]
})
export default class App extends Vue {
  private created() {
    if (cookie.get('Authorization') !== null) {
      http
        .Get(http.hosturl + '/api/user/me')
        .then((res) => {
          this.loggedin = true
          this.myinfo = res.data as UserInfoDto
        })
        .catch((err) => {
          this.loggedin = false
          this.myinfo = new UserInfoDto()
        })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/* Mobile Styles */
@media only screen and (max-width: 500px) {
  #nav {
    display: none;
  }
}
</style>
