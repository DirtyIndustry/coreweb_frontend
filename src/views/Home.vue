<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <el-button @click="onCheck">Check</el-button>
    <el-button @click="onLogout">Logout</el-button>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import Http from '@/utils/http'
import cookie from '@/utils/cookie'

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
private onCheck(e: MouseEvent) {
  Http.Get(Http.hosturl + '/api/token')
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    console.log('Http Get Finished.')
  })
}
private onLogout(e: MouseEvent) {
  this.$axios.delete(Http.hosturl + '/api/token')
  .then((res) => {
    console.log(res)
    cookie.del('Authorization')
    cookie.del('Login')
    this.$router.replace('/login')
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    console.log('Http Delete Finished.')
  })
}
}
</script>
