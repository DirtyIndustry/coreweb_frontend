<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button @click="onCheck">Check</el-button>
    <el-button @click="onLogout">Logout</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Http from '@/utils/http'
import cookie from '@/utils/cookie'

@Component
export default class About extends Vue {
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

