<template>
    <div class="page-body">
        <div class="background-pic"></div>
        <div class="header"></div>
        <div class="content">
            <div class="content-inner">
                <div class="center-panel"></div>
                <div class="login-panel">
                    <div class="separator-vertical"></div>
                    <div class="separator-vertical"></div>
                    <el-input class="input" clearable>
                        <i slot="prepend" class="fas fa-user"></i>
                    </el-input>
                    <div class="separator-vertical-small"></div>
                    <el-input class="input" clearable>
                        <i slot="prepend" class="fas fa-unlock-alt"></i>
                    </el-input>
                    <div class="separator-vertical"></div>
                    <div class="separator-vertical-small"></div>
                    <el-button type="primary" class="input">登录</el-button>
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
@import "../assets/fontawesome/css/all.min.css";
.separator-vertical {
    height: 10%;
}
.separator-vertical-small {
    height: 5%;
}
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
    .login-panel {
        height: 300px;
        width: 90%;
        margin: auto;
    }
    .input {
        width: 100%;
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
    .login-panel {
        height: 450px;
        width: 400px;
        background-color: #f2f2f2;
        float: right;
    }
    .input {
        width: 90%;
    }
}
</style>
