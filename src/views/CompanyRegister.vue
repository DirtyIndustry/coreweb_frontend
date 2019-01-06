<template>
    <div class="page-body">
        <div class="background-pic"></div>
        <div class="header"></div>
        <div class="content">
            <div class="content-inner">
                <div class="register-indicator-container">
                    <el-steps class="register-indicator" :active="activestep" align-center>
                        <el-step title="公司信息"></el-step>
                        <el-step title="注册人信息"></el-step>
                        <el-step title="完成"></el-step>
                    </el-steps>
                </div>
                <div class="register-container">
                    <router-view :register-data="registerData" @set-step="setStep"></router-view>
                </div>
            </div>
        </div>
        <div class="footer"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CompanyRegisterDto from '@/types/CompanyRegisterDto'

@Component
export default class CompanyRegister extends Vue {
    private activestep = 1
    private registerData = new CompanyRegisterDto()
    private setStep(value: number) {
        this.activestep = value
    }
}
</script>

<style scoped>
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
  height: 650px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.register-indicator-container {
  height: 100px;
  width: 600px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.register-indicator {
  flex: 1;
}
.register-container {
  height: 550px;
  width: 600px;
  background-color: #ffffff;
}
</style>
