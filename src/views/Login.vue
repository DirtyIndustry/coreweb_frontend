<template>
    <div class="page-body">
        <div class="background-pic"></div>
        <div class="header"></div>
        <div class="content">
            <div class="content-inner">
                <div class="center-panel"></div>
                <el-form class="login-panel" ref="loginform" :model="logindata" :rules="loginrules" label-width="0">
                    <div class="separator-vertical"></div>
                    <div class="separator-vertical"></div>
                    <el-form-item prop="userName" class="input">
                        <el-input v-model="logindata.userName" clearable>
                            <i slot="prefix" class="el-input__icon fas fa-user"></i>
                        </el-input>
                    </el-form-item>
                    <div class="separator-vertical-small"></div>
                    <el-form-item prop="password" class="input">
                        <el-input :type="passwordinputtype" v-model="logindata.password">
                            <i slot="prefix" class="el-input__icon fas fa-unlock-alt"></i>
                            <i slot="suffix" class="el-input__icon far eye-icon" :class="eyeiconclass" @mousedown="onEyePress" @mouseup="onEyeRelease"></i>
                        </el-input>
                    </el-form-item>
                    <div class="separator-vertical"></div>
                    <div class="separator-vertical-small"></div>
                    <el-form-item>
                        <el-button type="primary" class="input" @click="submitForm('loginform')">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="footer"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form';
import LoginBoard from '@/components/LoginBoard.vue'
import Cookie from '@/utils/cookie'

@Component({
    components: {
        LoginBoard
    }
})
export default class Login extends Vue {
private eyeiconclass = 'fa-eye-slash'
private passwordinputtype = 'password'
private logindata = {
    userName: '',
    password: ''
}
private loginrules = {
    userName: [{required: true, message: '请输入用户名', trigger: 'blur'}],
    password: [{required: true, message: '请输入密码', trigger: 'blur'}]
}
private submitForm(formname: string) {
    (this.$refs[formname] as ElForm).validate((valid) => {
        if (valid) {
            alert('submit')
        } else {
            console.log('error submit')
            return false
        }
    })
}
private onEyePress(e: any) {
    console.log(e)
    if (e.buttons === 1) {
        this.eyeiconclass = 'fa-eye'
        this.passwordinputtype = 'text'
    }
}
private onEyeRelease(e: any) {
    this.eyeiconclass = 'fa-eye-slash'
    this.passwordinputtype = 'password'
}
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
.eye-icon:hover {
    color: #000;
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
        background-color: #ffffff;
        float: right;
    }
    .input {
        width: 90%;
        margin: auto;
    }
}
</style>
