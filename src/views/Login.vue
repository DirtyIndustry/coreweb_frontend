<template>
    <div class="page-body">
        登录
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Cookie from '@/utils/cookie'

@Component
export default class Login extends Vue {
private mounted() {
    Cookie.set('trycookie', 'cookievalue', 0)
    console.log(Cookie.get('trycookie'))
    // Cookie.del('trycookie')
}
}
</script>

<style>
.page-body{
    border: 1px solid #000000;
}
</style>
