<template>
    <div class="page-body">
        <div class="background-pic"></div>
        <div class="header"></div>
        <div class="content">
            <div class="content-inner">
                <div class="center-panel"></div>
                <div class="login-panel">
                    <div class="separator-vertical"></div>
                    <el-input>
                        <div slot="prepend" class="fas fa-user"></div>
                    </el-input>
                    <div class="separator-vertical"></div>
                    <el-input></el-input>
                </div>
            </div>
        </div>
        <div class="footer"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Cookie from '@/utils/cookie'

@Component
export default class Login extends Vue {
private mounted() {
    // Cookie.set('trycookie', 'cookievalue', 0)
    // console.log(Cookie.get('trycookie'))
    // Cookie.del('trycookie')
}
}
</script>

<style scoped>
.separator-vertical {
    height: 10%;
}
/* Mobile Styles */
@media only screen and (max-width: 500px) {
    body {
        background-color: lightblue;
    }
    .page-body {
        border: 1px solid #000;
    }
    .header {
        height: 100px;
    }
    .footer {
        height: 100px;
    }
    .login-panel {
        border: 1px solid #000;
        height: 450px;
        width: 90%;
        margin: auto;
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
        background-image: url('/img/bg01.jpg');
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
    .center-panel {
        height: 450px;
        width: 600px;
        float: left;
    }
    .login-panel {
        height: 450px;
        width: 400px;
        background-color: #f2f2f2;
        float: left;
    }
}
</style>
