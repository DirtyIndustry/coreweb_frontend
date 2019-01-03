<template>
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
            <i slot="suffix" class="el-input__icon far eye-icon" :class="eyeiconclass" @mousedown="onEyePress"
                @mouseup="onEyeRelease"></i>
        </el-input>
    </el-form-item>
    <div class="separator-vertical"></div>
    <div class="separator-vertical-small"></div>
    <el-form-item>
        <el-button type="primary" class="input" @click="submitForm('loginform')">登录</el-button>
    </el-form-item>
</el-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form';

@Component
export default class LoginBoard extends Vue {
    private eyeiconclass = 'fa-eye-slash'
    private passwordinputtype = 'password'
    private logindata = {userName: '', password: ''}
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
}
</script>

<style>
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
</style>