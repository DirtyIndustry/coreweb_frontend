<template>
<el-form class="login-panel" ref="loginform" :model="logindata" :rules="loginrules" label-width="0">
    <div class="separator-vertical"></div>
    <div class="separator-vertical"></div>
    <el-form-item prop="userName" class="input">
        <el-input v-model="logindata.userName" clearable @focus="onInputfocused">
            <i slot="prefix" class="el-input__icon fas fa-user"></i>
        </el-input>
    </el-form-item>
    <div class="separator-vertical-small"></div>
    <el-form-item prop="password" class="input">
        <el-input :type="passwordinputtype" v-model="logindata.password" @focus="onInputfocused" @blur="onInputBlur">
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
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'
import LoginDto from '@/types/LoginDto'

@Component
export default class LoginBoard extends Vue {
    @Prop({default: true}) private loginValid!: boolean
    private eyeiconclass = 'fa-eye-slash'
    private passwordinputtype = 'password'
    private logindata = new LoginDto()
    private loginrules = {
        userName: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'},
            {validator: this.isLoginValid, trigger: 'blur'}]
    }
    @Emit()
    private submit() {
        return this.logindata
    }
    @Emit()
    private setValid(value: boolean) {
        return value
    }
    @Watch('loginValid')
    private onLoginValidChanged(val: boolean, oldVal: boolean) {
        this.validateForm()
    }
    private submitForm(formname: string) {
        (this.$refs[formname] as ElForm).validate((valid) => {
            if (valid) {
                this.submit()
            }
        })
    }
    private validateForm() {
        (this.$refs.loginform as ElForm).validate((valid) => {
            return
        })
    }
    private isLoginValid(rule: any, value: string, callback: any) {
        if (this.loginValid) {
            callback()
        } else {
            callback(new Error('用户名或密码错误'))
        }
    }
    private onEyePress(e: MouseEvent) {
        if (e.buttons === 1) {
            this.eyeiconclass = 'fa-eye'
            this.passwordinputtype = 'text'
        }
    }
    private onEyeRelease(e: MouseEvent) {
        this.eyeiconclass = 'fa-eye-slash'
        this.passwordinputtype = 'password'
    }
    private onInputfocused(e: FocusEvent) {
        if (this.logindata.userName !== '' && this.logindata.password !== '') {
            this.setValid(true)
            this.validateForm()
        }
    }
    private onInputBlur(e: FocusEvent) {
        if (this.logindata.userName !== '' && this.logindata.password !== '') {
            this.setValid(true)
            this.validateForm()
        }
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