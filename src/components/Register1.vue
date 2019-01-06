<template>
    <div class="register-board">
        <el-form ref="form" :model="registerData" :rules="rules" label-width="110px" label-position="left" hide-required-asterisk>
            <div class="separator-vertical"></div>
            <el-form-item prop="companyName" label="公司名称：">
                <el-input v-model="registerData.companyName"></el-input>
            </el-form-item>
            <div class="separator-vertical"></div>
            <el-form-item prop="company" label="公司英文简称：">
                <el-input v-model="registerData.company"></el-input>
            </el-form-item>
            <div class="description">公司的英文简称，仅可使用数字、字母和下划线组成。我们将以此做为您专属数据库的名称</div>
        </el-form>
        <div class="button-panel">
            <el-button class="button" type="primary" @click="onNextClick">下一步</el-button>
            <div class="separator-vertical"></div>
            <router-link class="login-link" to="/login">已有账号？请登录</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator'
import CompanyRegisterDto from '@/types/CompanyRegisterDto'
import { ElForm } from 'element-ui/types/form';
import Http from '@/utils/http';

@Component
export default class Register1 extends Vue {
    @Prop({ default: () => new CompanyRegisterDto() }) private registerData!: CompanyRegisterDto
    private rules = {
        companyName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        company: [{ validator: this.validateCompany, trigger: 'blur' }]
    }
    @Emit()
    private setStep() {
        return 1
    }
    private nextStep() {
        this.$router.push('/register/step2')
    }
    private validateCompany(rule: any, value: any, callback: any) {
        // value = value.trim()
        const regex = new RegExp(/^[A-Za-z0-9]\w*[A-Za-z0-9]$/)
        if (value === '') {
            callback(new Error('请输入公司英文简称'))
        } else if (value.length > 20) {
            callback(new Error('公司英文简称长度不能超过30位'))
        } else if (!regex.test(value)) {
            callback(new Error('公司英文简称只能包含数字和字母，在中间可以使用下划线'))
        } else {
            Http.Get(Http.hosturl + '/api/user/company/' + value)
                .then((res) => {
                    callback(new Error('该简称已被占用'))
                })
                .catch((err) => {
                    if (err.response) {
                        if (err.response.status === 404) {
                            callback()
                        } else {
                            console.error(err)
                            callback(new Error('与服务器通信时出错'))
                        }
                    } else {
                        console.error(err)
                        callback(new Error('与服务器通信时出错'))
                    }
                })
        }
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
    private mounted() {
        this.setStep()
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
  font-size: 14px;
  text-align: left;
}
.button-panel {
  position: absolute;
  bottom: 0;
  height: 100px;
  width: 100%;
}
.button {
  width: 100%;
}
.login-link {
  float: left;
  margin-left: 10px;
}
</style>
