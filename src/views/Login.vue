<template>
    <div class="page-body">
        <div class="background-pic"></div>
        <div class="header"></div>
        <div class="content">
            <div class="content-inner">
                <div class="center-panel"></div>
                <LoginBoard :loginurl="loginurl" :successurl="successurl" :registerurl="registerurl"></LoginBoard>
            </div>
        </div>
        <div class="footer"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LoginBoard from '@/components/LoginBoard.vue'
import Http from '@/utils/http'

@Component({
    components: {
        LoginBoard
    }
})
export default class Login extends Vue {
    get loginurl() {
        return Http.hosturl + '/api/token'
    }
    private successurl = '/home'
    private registerurl = '/register'
    private findpasswordurl = '/findpassword'
}
</script>

<style scoped>
/* Mobile Styles */
@media only screen and (max-width: 500px) {
  .background-pic {
    background-color: lightblue;
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    background-image: url('/img/bg01.jpg');
    background-attachment: fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    background-size: cover;
    z-index: -1;
  }
  .header {
    height: 80px;
  }
  .footer {
    height: 80px;
  }
  .content {
    background-color: rgba(255, 255, 255, 0.3);
  }
}
/* Desktop Styles */
@media only screen and (min-width: 501px) {
  .background-pic {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    background-image: url('/img/bg02.jpg');
    background-attachment: fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    background-size: cover;
    z-index: -1;
  }
  .header {
    height: 100px;
  }
  .footer {
    height: 100px;
  }
  .content-inner {
    width: 1000px;
    height: 450px;
    margin: auto;
  }
  /* .center-panel {
        height: 450px;
        width: 600px;
        float: left;
    } */
}
</style>
