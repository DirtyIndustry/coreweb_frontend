<template>
    <el-form class="login-panel" ref="loginform" :model="logindata" :rules="loginrules" label-width="0">
        <div class="separator-vertical"></div>
        <div class="separator-vertical"></div>
        <el-form-item prop="userName" class="input">
            <el-input v-model="logindata.userName" clearable @focus="onInputfocused" @keyup.enter.native="onUserNameEnter">
                <i slot="prefix" class="el-input__icon fas fa-user"></i>
            </el-input>
        </el-form-item>
        <div class="separator-vertical-small"></div>
        <el-form-item prop="password" class="input">
            <el-input ref="passwordinput" :type="passwordinputtype" v-model="logindata.password" @focus="onInputfocused" @blur="onInputBlur" @keyup.enter.native="onPasswordEnter">
                <i slot="prefix" class="el-input__icon fas fa-unlock-alt"></i>
                <i slot="suffix" class="el-input__icon far eye-icon" :class="eyeiconclass" @mousedown="onEyePress" @mouseup="onEyeRelease"></i>
            </el-input>
        </el-form-item>
        <div class="separator-vertical-small"></div>
        <div class="separator-vertical-small input">
            <el-checkbox class="rememberme-check" v-model="rememberMe">记住我</el-checkbox>
        </div>
        <div class="separator-vertical-small"></div>
        <el-form-item>
            <el-button type="primary" class="input" :loading="isLogingin" @click="submitForm('loginform')">登录</el-button>
        </el-form-item>
        <!-- <div class="separator-vertical-small"></div> -->
        <div class="separator-vertical-small input">
            <router-link class="register-link" :to="registerurl">新公司注册</router-link>
        </div>
    </el-form>
</template>

<script lang="ts">
import { Component, Vue, Mixins, Prop, Watch } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'
import { ElInput } from 'element-ui/types/input'
import GlobalProperties from '@/mixins/globalproperties'
import Cookie from '@/utils/cookie'
import Http from '@/utils/http'
import Utils from '@/utils/utils'
import LoginDto from '@/types/LoginDto'
import UserInfoDto from '@/types/UserInfoDto'

@Component({
    mixins: [GlobalProperties]
})
export default class LoginBoard extends Vue {
    @Prop({ default: '' }) private loginurl!: string
    @Prop({ default: '' }) private successurl!: string
    @Prop({ default: '' }) private registerurl!: string
    @Prop({ default: '' }) private findpasswordurl!: string
    private loginValid = true
    private isLogingin = false
    private rememberMe = false
    private eyeiconclass = 'fa-eye-slash'
    private passwordinputtype = 'password'
    private logindata = new LoginDto()
    private loginrules = {
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },
        { validator: this.isLoginValid, trigger: 'blur' }]
    }
    @Watch('loginValid')
    private onLoginValidChanged(val: boolean, oldVal: boolean) {
        this.validateForm()
    }
    private submitForm(formname: string) {
        (this.$refs[formname] as ElForm).validate((valid) => {
            if (valid) {
                this.doLoginEncrypt(this.logindata)
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
    private doLogin(logindata: LoginDto) {
        this.isLogingin = true
        Http.Post(this.loginurl, logindata)
            .then((res) => {
                Cookie.set('Authorization', res.data, 0)
                if (this.rememberMe) {
                    Cookie.encryptSet('Login', JSON.stringify(logindata), 30)
                }
                Http.Get(Http.hosturl + '/api/user/' + logindata.userName)
                    .then((resget) => {
                        this.loggedin = true
                        this.myinfo = resget.data as UserInfoDto
                        this.gotoSuccessUrl()
                    })
                    .catch((errget) => {
                        this.loggedin = false
                        this.myinfo = new UserInfoDto()
                    })
            })
            .catch((err) => {
                if (err.response) {
                    if (err.response.status === 400) {
                        this.loginValid = false
                    }
                }
            })
            .finally(() => {
                this.isLogingin = false
            })
    }
    private doLoginEncrypt(logindata: LoginDto) {
        this.isLogingin = true
        const ciphertext = Utils.encryptString(JSON.stringify(logindata), Utils.serverkey)
        this.$axios.post(Http.hosturl + '/api/Token/encrypt', { ciphertext })
            .then((res) => {
                Cookie.set('Authorization', res.data, 0)
                if (this.rememberMe) {
                    Cookie.encryptSet('Login', JSON.stringify(logindata), 30)
                }
                Http.Get(Http.hosturl + '/api/user/' + logindata.userName)
                    .then((resget) => {
                        this.loggedin = true
                        this.myinfo = resget.data as UserInfoDto
                        this.gotoSuccessUrl()
                    })
                    .catch((errget) => {
                        this.loggedin = false
                        this.myinfo = new UserInfoDto()
                    })
            })
            .catch((err) => {
                if (err.response) {
                    if (err.response.status === 400) {
                        this.loginValid = false
                    }
                }
            })
            .finally(() => {
                this.isLogingin = false
            })
    }
    private gotoSuccessUrl() {
        const from = this.$route.query.redirect
        if (typeof (from) === 'string' && from !== '') {
            this.$router.push(from)
        } else {
            this.$router.push(this.successurl)
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
            this.loginValid = true
            this.validateForm()
        }
    }
    private onInputBlur(e: FocusEvent) {
        if (this.logindata.userName !== '' && this.logindata.password !== '') {
            this.loginValid = true
            this.validateForm()
        }
    }
    private onUserNameEnter(e: KeyboardEvent) {
        (this.$refs.passwordinput as ElInput).focus()
    }
    private onPasswordEnter(e: KeyboardEvent) {
        (this.$refs.passwordinput as ElInput).blur()
        this.submitForm('loginform')
    }
    private mounted() {
        const logincookie = Cookie.decryptGet('Login')
        if (logincookie) {
            this.logindata = JSON.parse(logincookie)
            this.rememberMe = true
            this.doLoginEncrypt(this.logindata)
        }
    }
}
</script>

<style Scoped>
@import '../assets/fontawesome/css/all.min.css';

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
.rememberme-check {
  float: left;
  left: 10px;
}
.register-link {
  float: left;
  margin-left: 10px;
}
</style>