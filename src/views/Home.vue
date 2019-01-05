<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <el-button @click="onCheck">Check</el-button>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import Http from '@/utils/http'

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
private onCheck(e: MouseEvent) {
  // this.$axios.get(Utils.hosturl + '/api/token', {withCredentials: true})
  // .then((res) => {
  //   console.log(res)
  // })
  // .catch((err) => {
  //   console.log(err)
  // })
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
}
</script>
