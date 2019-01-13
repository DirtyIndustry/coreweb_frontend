<template>
    <div class="HeaderBar">
        <router-link class="logo" to="/home">
            <img class="logo-img" src="logo.png" alt="">
        </router-link>
        <div class="header">
            <div class="header-top clearfix">
                <div class="header-top-social">
                    <p class="header-top-tagline">
                        <span>Inspiring Creativity</span>
                    </p>
                    <ul class="header-top-social-list">
                        <li>
                            <a class="header-top-social-list-a" href="https://www.facebook.com">
                                <span class="u-vis-hide">Find us on Facebook</span>
                                <span class="icon fab fa-facebook-square"></span>
                            </a>
                        </li>
                        <li>
                            <a class="header-top-social-list-a" href="https://www.twitter.com">
                                <span class="u-vis-hide">Find us on Twitter</span>
                                <span class="icon fab fa-twitter-square"></span>
                            </a>
                        </li>
                        <li>
                            <a class="header-top-social-list-a" href="https://www.pinterest.com">
                                <span class="u-vis-hide">Find us on Pinterest</span>
                                <span class="icon fab fa-pinterest-square"></span>
                            </a>
                        </li>
                        <li>
                            <a class="header-top-social-list-a" href="https://www.linkedin.com">
                                <span class="u-vis-hide">Find us on Linkedin</span>
                                <span class="icon fab fa-linkedin"></span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="header-top-search"></div>
                <ul class="header-top-nav">
                    <li>
                        <router-link class="is-active" to="/home">Home</router-link>
                    </li>
                    <li></li>
                    <li>
                        <router-link class="nav-link" to="/about">Contact Us</router-link>
                    </li>
                    <li>
                        <router-link class="nav-link" to="/register">Become a Member</router-link>
                    </li>

                    <router-link class="login-link" to="/login">Member Login</router-link>

                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins, Prop, Emit, Watch } from 'vue-property-decorator'
import GlobalProperties from '@/mixins/globalproperties'

@Component({
    mixins: [GlobalProperties]
})
export default class HeaderBar extends Vue {

}
</script>

<style scoped>
@import '../assets/fontawesome/css/all.min.css';

.HeaderBar {
  width: 100%;
  height: 140px;
  position: fixed;
  top: 0;
  left: 0;
  padding-left: 150px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 5px 0px;
  display: block;
  color: #707070;
}
*,
::after,
::before {
  box-sizing: border-box;
}
.logo {
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  height: 100%;
  border-right: 1px solid #f1f1f1;
}
.logo-img {
  width: 140px;
  height: 140px;
  margin: 0 auto;
  -webkit-transition: opacity 0.2s ease-in-out;
  transition: opacity 0.2s ease-in-out;
}
.logo-img:hover {
  opacity: 0.7;
}
.header-top {
  height: 50px;
  width: 100%;
  background-color: #1f1f21;
  display: block;
}
.clearfix::after {
  clear: both;
  content: '';
  display: table;
}
.header-top-social {
  background-color: #15b0ad;
  display: flex;
  flex-grow: 0;
  align-items: center;
  float: left;
  height: 50px;
  width: auto;
  color: #fff;
  padding-right: calc(50px + 25 * (100vw - 961px) / 839);
  padding-left: calc(20px + 30 * (100vw - 961px) / 839);
}
.header-top-tagline {
  margin: 0;
  color: #fff;
  font-size: calc(14px + 4 * (100vw - 481px) / 1319);
}
.header-top-social-list {
  display: block;
  list-style: none;
  margin: 0;
  margin-left: 25px;
  padding: 0;
}
.header-top-social-list li {
  float: left;
  padding: 0;
  margin: 0;
}
.header-top-social-list li + li {
  margin-left: 10px;
}
.header-top-social-list-a {
  color: #fff;
  transition: opacity 0.2s ease-in-out;
}
.header-top-social-list-a:hover {
  opacity: 0.7;
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
.icon {
  font-size: 2rem;
}
.header-top-search {
  float: left;
  width: 120px;
  height: 50px;
  background-color: #fbfbfc;
  position: relative;
  margin-right: 50px;
}
.header-top-search::before {
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
.header-top-search::after {
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
.header-top-nav {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  align-items: center;
  -webkit-box-align: center;
  font-weight: 700;
  font-style: normal;
  color: #fff;
  height: 50px;
  width: auto;
  float: right;
  font-family: 'Calibri-Bold', 'HelveticaNeue-Light', 'Helvetica Neue Light',
    'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
}
.is-active {
  color: #f15827;
}
.header-top-nav a {
  padding-right: calc(8px + 4 * (100vw - 961px) / 839);
  padding-left: calc(8px + 4 * (100vw - 961px) / 839);
  text-decoration: none;
  outline: 0;
  transition: color 0.2s linear;
  /* background: 0 0; */
}
.nav-link {
  color: inherit;
}
.nav-link:hover {
  color: #f15827;
}
.login-link {
  background-color: #f15827;
  padding: 0 15px;
  height: 50px;
  line-height: 50px;
  transition: background-color 0.2s ease-in-out !important;
  color: #fff;
  font-size: calc(14px + 2 * (100vw - 481px) / 1319);
  font-family: Intro-Bold, HelveticaNeue-Light, 'Helvetica Neue Light',
    'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
  font-weight: 400;
  font-style: normal;
}
.login-link:hover {
  background-color: #707070;
}
</style>
