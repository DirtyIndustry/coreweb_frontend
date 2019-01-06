<template>
    <div class="register-board">
        <el-form ref="form" :model="registerData" :rules="rules" label-width="110px" label-position="left" hide-required-asterisk>
            <div class="separator-vertical"></div>
            <el-form-item prop="userName" label="用户名：">
                <el-input v-model="registerData.userName"></el-input>
            </el-form-item>
            <div class="separator-vertical"></div>
            <el-form-item prop="password" label="密码：">
                <el-input type="password" v-model="registerData.password"></el-input>
            </el-form-item>
            <div class="separator-vertical"></div>
            <el-form-item prop="checkpass" label="确认密码：">
                <el-input type="password" v-model="checkpass"></el-input>
            </el-form-item>
            <div class="separator-vertical"></div>
            <div class="description">公司最高级别部门的名称，该部门的职员有权限浏览任何其他部门的信息，通常命名为总经理办公室、管理中心等</div>
            <el-form-item prop="department" label="部门：">
                <el-input v-model="registerData.department"></el-input>
            </el-form-item>
            <div class="separator-vertical"></div>
            <div class="description">系统最高级别权限职位的名称，该职位将拥有系统的完全控制权，例如信息总管、CEO、总经理等</div>
            <el-form-item prop="position" label="职位：">
                <el-input v-model="registerData.position"></el-input>
            </el-form-item>
        </el-form>
        <div class="button-panel">
            <div class="button-row">
                <el-button class="button" type="primary" @click="onPrevClick">上一步</el-button>
                <dir class="separator-button"></dir>
                <el-button class="button" type="primary" @click="onNextClick">下一步</el-button>
            </div>
            <div class="separator-vertical"></div>
            <router-link class="login-link" to="/login">已有账号？请登录</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator'
import CompanyRegisterDto from '@/types/CompanyRegisterDto'
import { ElForm } from 'element-ui/types/form'
import Http from '@/utils/http'

@Component
export default class Register2 extends Vue {
    @Prop({ default: () => new CompanyRegisterDto() }) private registerData!: CompanyRegisterDto
    private checkpass = ''
    private rules = {
        userName: [{ validator: this.validateUserName, trigger: 'blur' }],
        password: [{ validator: this.validatePassword, trigger: 'blur' }],
        checkpass: [{ validator: this.validateCheckpass, trigger: 'blur' }],
        department: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
        position: [{ required: true, message: '请输入职位名称', trigger: 'blur' }]
    }
    @Emit()
    private setStep() {
        return 2
    }
    private prevStep() {
        this.$router.push('/register/step1')
    }
    private nextStep() {
        this.$router.push('/register/step3')
    }
    private validateUserName(rule: any, value: string, callback: any) {
        value = value.trim()
        // const regex = new RegExp(/^[A-Za-z0-9]\w*[A-Za-z0-9]$/)
        if (value === '') {
            callback(new Error('请输入用户名'))
        } else if (value.length > 20) {
            callback(new Error('用户名长度不能超过30位'))
        } else {
            Http.Get(Http.hosturl + '/api/user/exist/' + value)
                .then((res) => {
                    if (res.data === true) {
                        callback(new Error('该用户名已被占用'))
                    } else {
                        callback()
                    }
                })
                .catch((err) => {
                    console.error(err)
                    callback(new Error('与服务器通信时出错'))
                })
        }
    }
    private validatePassword(rule: any, value: string, callback: any) {
        const regex = new RegExp(/\s+/, 'g')
        if (value === '') {
            callback(new Error('请输入密码'))
        } else if (regex.test(value)) {
            callback(new Error('密码中不能含有空格'))
        } else {
            if (this.checkpass !== '') {
                (this.$refs.form as ElForm).validateField('checkpass', (err) => { callback() })
            }
            callback()
        }
    }
    private validateCheckpass(rule: any, value: string, callback: any) {
        if (this.checkpass === '') {
            callback(new Error('请再次输入密码'))
        } else if (this.checkpass !== this.registerData.password) {
            callback(new Error('两次输入的密码不一致'))
        } else {
            callback()
        }
    }
    private onPrevClick(e: MouseEvent) {
        this.prevStep()
    }
    private onNextClick(e: MouseEvent) {
        (this.$refs.form as ElForm).validate((valid) => {
            if (valid) {
                this.nextStep()
            } else {
                return
            }
        })
    }
    private companyInfoExists() {
        let result = false
        if (this.registerData.companyName !== '' && this.registerData.company !== '') {
            result = true
        }
        return result
    }
    private mounted() {
        this.setStep()
        if (!this.companyInfoExists()) {
            this.prevStep()
        }
    }
}
</script>

<style scoped>
.register-board {
  width: 90%;
  height: 100%;
  margin: auto;
  position: relative;
}
.separator-vertical {
  height: 10px;
}
.description {
  float: left;
  margin-left: 110px;
  font-size: 13px;
  text-align: left;
}
.button-panel {
  position: absolute;
  bottom: 0;
  height: 100px;
  width: 100%;
}
.button-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.button {
  width: 25%;
}
.separator-button {
  width: 10%;
}
.login-link {
  float: left;
  margin-left: 10px;
}
</style>
