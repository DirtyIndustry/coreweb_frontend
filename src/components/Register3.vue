<template>
    <div class="register-board">
        <div class="separator-vertical"></div>
        <div class="title">请检查注册信息是否填写无误：</div>
        <div class="separator-vertical"></div>
        <div class="register-info-panel">
            <div class="register-info-row">
                <div class="register-info-content header">公司名称：</div>
                <div class="register-info-content">{{registerData.companyName}}</div>
            </div>
            <div class="separator-line"></div>
            <div class="register-info-row">
                <div class="register-info-content header">公司英文简称：</div>
                <div class="register-info-content">{{registerData.company}}</div>
            </div>
            <div class="separator-line"></div>
            <div class="register-info-row">
                <div class="register-info-content header">注册人用户名：</div>
                <div class="register-info-content">{{registerData.userName}}</div>
            </div>
            <div class="separator-line"></div>
            <div class="register-info-row">
                <div class="register-info-content header">注册人部门：</div>
                <div class="register-info-content">{{registerData.department}}</div>
            </div>
            <div class="separator-line"></div>
            <div class="register-info-row">
                <div class="register-info-content header">注册人职位：</div>
                <div class="register-info-content">{{registerData.position}}</div>
            </div>
        </div>
        <div class="button-panel">
            <div class="button-row">
                <el-button class="button" @click="onPrevClick">上一步</el-button>
                <dir class="separator-button"></dir>
                <el-button class="button-confirm" type="primary" :loading="isSubmiting" @click="onNextClick">确认无误，提交</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import CompanyRegisterDto from '@/types/CompanyRegisterDto'
import Http from '@/utils/http'

@Component
export default class Register3 extends Vue {
    @Prop({ default: () => new CompanyRegisterDto() }) private registerData!: CompanyRegisterDto
    private isSubmiting = false
    @Emit()
    private setStep() {
        return 3
    }
    private toFirstStep() {
        this.$router.push('/register/step1')
    }
    private toSecondStep() {
        this.$router.push('/register/step2')
    }
    private onPrevClick(e: MouseEvent) {
        this.toSecondStep()
    }
    private onNextClick(e: MouseEvent) {
        this.isSubmiting = true
        this.$axios.post(Http.hosturl + '/api/user', this.registerData)
            .then((res) => {
                console.log(res)
                this.$alert('注册成功，将返回登录页面', '', {
                    type: 'success',
                    showClose: false,
                    showConfirmButton: false,
                    showCancelButton: false,
                })
                setTimeout(() => {
                    this.$msgbox.close()
                    this.$router.push('/login')
                }, 3000);
            })
            .catch((err) => {
                console.error(err)
            })
            .finally(() => {
                this.isSubmiting = false
            })
    }
    private companyInfoExists() {
        let result = false
        if (this.registerData.companyName !== '' && this.registerData.company !== '') {
            result = true
        }
        return result
    }
    private userInfoExists() {
        let result = false
        if (this.registerData.userName !== ''
            && this.registerData.password !== ''
            && this.registerData.department !== ''
            && this.registerData.position !== '') {
            result = true
        }
        return result
    }
    private mounted() {
        this.setStep()
        if (!this.companyInfoExists()) {
            this.toFirstStep()
        } else if (!this.userInfoExists()) {
            this.toSecondStep()
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
  display: flex;
  flex-direction: column;
}
.separator-vertical {
  height: 20px;
}
.separator-line {
  width: 100%;
  border-bottom: 1px solid #cecece;
}
.title {
  font-weight: bold;
}
.register-info-panel {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.register-info-row {
  height: 50px;
  width: 100%;
}
.register-info-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.header {
  width: 120px;
  float: left;
  font-weight: bold;
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
.button-confirm {
  width: 55%;
}
.separator-button {
  width: 10%;
}
.login-link {
  float: left;
  margin-left: 10px;
}
</style>
