<template>
  <div class="HeaderBarContainer">
    <router-link class="logo" to="/home">
      <img class="logo-img" src="logo.png" alt>
      <img class="logo-img2" src="logo2.png" alt>
    </router-link>
    <div class="body">
      <div class="top-bar">
        <div class="top-left">
          <p class="top-left-tagline">
            <span>Inspiring Creativity</span>
          </p>
          <div class="top-left-social-list">
            <div class="top-left-social-list-li">
              <a class="top-left-social-list-a" href="https://www.facebook.com">
                <span class="u-vis-hide">Find us on Facebook</span>
                <span class="icon fab fa-facebook-square"></span>
              </a>
            </div>
            <div class="top-left-social-list-li">
              <a class="top-left-social-list-a" href="https://www.twitter.com">
                <span class="u-vis-hide">Find us on Twitter</span>
                <span class="icon fab fa-twitter-square"></span>
              </a>
            </div>
            <div class="top-left-social-list-li">
              <a class="top-left-social-list-a" href="https://www.pinterest.com">
                <span class="u-vis-hide">Find us on Pinterest</span>
                <span class="icon fab fa-pinterest-square"></span>
              </a>
            </div>
            <div class="top-left-social-list-li">
              <a class="top-left-social-list-a" href="https://www.linkedin.com">
                <span class="u-vis-hide">Find us on Linkedin</span>
                <span class="icon fab fa-linkedin"></span>
              </a>
            </div>
          </div>
        </div>
        <div class="top-middle"></div>
        <div class="top-right">
          <div v-if="!loggedin" class="top-right-navi">
            <router-link class="link active-link" to="/home">Home</router-link>
            <router-link class="link navi-link" to="/about">Contact Us</router-link>
            <router-link class="link navi-link" to="/register">Become a Member</router-link>
            <router-link class="login-link" to="/login">Member Login</router-link>
          </div>

          <div v-if="loggedin" class="top-right-navi">
            <MenuButton
              class="login-link menu-button"
              menuPosition="bottom-left"
              :menuItems="menuItems"
              activeColor="#f15827"
              @item-click="onDropdownMenuItemClick"
            >
              <span class="fa fa-user"></span>
              {{userName}}
            </MenuButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins, Prop, Emit, Watch } from 'vue-property-decorator'
import GlobalProperties from '@/mixins/globalproperties'
import MenuButton from '@/components/MenuButton.vue'
import http from '@/utils/http'

@Component({
  components: {
    MenuButton,
  },
  mixins: [GlobalProperties],
})
export default class HeaderBar extends Vue {
  private menuItems = [
    {
      textlabel: 'User Infos',
      separator: false,
      prefix: `<i class="fa fa-user"></i>`,
    },
    {
      textlabel: 'Change Password',
      separator: false,
      prefix: `<i class="fa fa-user"></i>`,
    },
    {
      textlabel: 'Message Box',
      separator: false,
      prefix: `<i class="fa fa-user"></i>`,
    },
    { textlabel: '', separator: true },
    {
      textlabel: 'Logout',
      separator: false,
      prefix: `<i class="fa fa-user"></i>`,
    },
  ]
  get userName() {
    if (this.myinfo.userName) {
      return this.myinfo.userName
    }
    return 'Member Infos'
  }
  private onDropdownMenuItemClick(e: number) {
    console.log('下拉菜单中的第' + e + '项点击了')
    switch (e) {
      case 4:
        http.logout()
        break
      default:
        break
    }
  }
}
</script>

<style scoped>
@import '../assets/fontawesome/css/all.min.css';

.HeaderBarContainer {
  width: 100%;
  min-width: 1000px;
  height: 140px;
  position: fixed;
  top: 0;
  left: 0;
  display: block;
  color: #707070;
  display: flex;
  flex-direction: row;
}
.logo {
  width: 140px;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 5px 5px 5px -3px;
}
.logo-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 140px;
  height: 140px;
  background-color: #fff;
  -webkit-transition: opacity 0.2s ease-in-out;
  transition: opacity 0.2s ease-in-out;
  z-index: 5;
}
.logo-img2 {
  position: absolute;
  top: 0;
  left: 0;
  width: 140px;
  height: 140px;
  background-color: #fff;
  -webkit-transition: opacity 0.2s ease-in-out;
  transition: opacity 0.2s ease-in-out;
}
.body {
  flex: 1;
  height: 100%;
}
.top-bar {
  height: 50px;
  background-color: #1f1f21;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 5px 0;
}
.top-left {
  height: 100%;
  background-color: #15b0ad;
  float: left;
  padding-left: calc(20px + 30 * (100vw - 961px) / 839);
  padding-right: 50px;
}
.top-middle {
  height: 100%;
  width: 120px;
  background-color: #fbfbfc;
  float: left;
  position: relative;
  /* margin-right: 50px; */
}
.top-middle::before {
  right: 100%;
  border-width: 0 50px 50px 0;
  border-color: transparent #fbfbfc transparent transparent;
  border-style: solid;
  content: '';
  position: absolute;
  top: 0;
  width: 0;
  height: 0;
}
.top-middle::after {
  left: 100%;
  border-width: 50px 0 0 50px;
  border-color: transparent transparent transparent #fbfbfc;
  border-style: solid;
  content: '';
  position: absolute;
  top: 0;
  width: 0;
  height: 0;
}
.top-right {
  height: 100%;
  float: right;
}
.u-vis-hide {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px !important;
  overflow: hidden;
  padding: 0;
  position: absolute !important;
  width: 1px;
}
.top-left-tagline {
  float: left;
  color: #fff;
}
.top-left-social-list {
  height: 100%;
  padding: 0 10px;
  float: left;
  display: flex;
  flex-direction: row;
}
.top-left-social-list-li {
  float: left;
  margin: 0 5px;
  display: flex;
  align-items: center;
}
.top-left-social-list-a {
  font-size: 2rem;
  color: #fff;
  transition: opacity 0.2s ease-in-out;
}
.top-left-social-list-a:hover {
  opacity: 0.7;
}
.top-right-navi {
  height: 100%;
  display: flex;
  align-items: center;
  font-weight: 700;
  font-style: normal;
}
.link {
  color: #fff;
  text-decoration: none;
  margin-right: 20px;
  transition: color 0.2s linear;
}
.active-link {
  color: #f15827;
}
.navi-link:hover {
  color: #f15827;
}
.login-link {
  background-color: #f15827;
  padding: 0 15px;
  height: 100%;
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;
  transition: background-color 0.2s linear;
}
.login-link:hover {
  background-color: #707070;
}
.menu-button {
  min-width: 100px;
  justify-content: center;
  background-color: #707070;
}
.menu-button:hover {
  background-color: #f15827;
}
@media only screen and (min-width: 1140px) {
  .logo-img2 {
    opacity: 0;
  }
  .logo-img:hover {
    opacity: 0.7;
  }
}
@media only screen and (max-width: 1139px) {
  .top-left-tagline {
    display: none;
  }
  .logo {
    width: 50px;
    height: 50px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 1px 5px 0;
  }
  .logo-img {
    opacity: 0;
    width: 50px;
    height: 50px;
    left: 0;
  }
  .logo-img2 {
    opacity: 1;
    width: 50px;
    height: 50px;
    left: 0;
  }
  .logo-img:hover {
    opacity: 1;
  }
}
</style>
