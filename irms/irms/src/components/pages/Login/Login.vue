<template>
    <div class="login-container clear">
        <head-top headTitle="IRMS">       
        </head-top>
        <div class="login-form">
            <section class="input-container">
                <input type="text" placeholder="账号" v-model.lazy="userAccount">
            </section>
            <section class="input-container">
                <input v-if="!showPassword" type="password" placeholder="密码" v-model="password">
                <input v-else placeholder="密码" v-model="password">
                <div class="botton-switch" :class="{changeToText:showPassword}">
                    <div class="circle-button" :class="{transToRight:showPassword}" @click="changePassWordType"></div>
                    <span>abc</span>
                    <span>...</span>
                </div>
            </section>
            <section class="input-container captcha-code-container">
                <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
                <div class="img-change-img">
                    <img v-show="captchaCodeImg" :src="captchaCodeImg">
                    <div class="change-img" @click="getCaptchaCode">
                        <p>看不清</p>
                        <p>换一张</p>
                    </div>
                </div>
            </section>
        </div>
        <p class="login-tips">
            温馨提示:目前暂不支持 老 旧 浏览器，请用新版浏览器运行此程序
        </p>
        <div class="login-button" @click="LoginClick">登录</div>
        <router-link to="/forget" class="to-forget" >重置密码</router-link>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </div>
  </template>

<script>
    import headTop from '../../header/header'
    import alertTip from '../../common/alertTip'
    import {
        url,
        routerMode,
        imgBaseUrl
    } from '@/config/env';
    import {
        mapState,
        mapMutations
    } from 'vuex';
    export default {
        name: 'Login',
        data() {
            return {
                loginWay: false, //密码or短信
                showPassword: true, //是否显示密码
                userInfo: null,
                userAccount: '',
                password: '',
                captchaCodeImg: null, //验证码地址
                codeNumber: null, //验证码
                showAlert: false, //显示提示组件
                alertText: '' //提示的内容
            }
        },
        components: {
            headTop,
            alertTip,
        },
        methods: {
            ...mapMutations([
                'RECORD_USERINFO',
            ]),
            closeTip() {
                this.showAlert = false;
            },
            getCaptchaCode() {
                this.captchaCodeImg = null;
            },
            changePassWordType() {
                this.showPassword = !this.showPassword;
            },
            changeLoginWay() {
                this.loginWay = !this.loginWay;
            },
            LoginClick() {
                if (!this.userAccount) {
                    this.showAlert = true;
                    this.alertText = "请输入手机号/邮箱/用户名"
                    return;
                } else if (!this.password) {
                    this.showAlert = true;
                    this.alertText = "请输入密码"
                    return;
                } else if (!this.codeNumber) {
                    this.showAlert = true;
                    this.alertText = '请输入验证码';
                    return
                }
                //get
                this.userInfo = null;
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .login-container {
        padding-top: 1.95rem;
        /* max-width: 600px;
        margin: 0 auto;
        border: 1px solid #eee; */
    }
    
    .login-container p,
    .login-container span,
    .login-container input {
        font-family: helvetica neue, tahoma, arial;
    }
    
    .login-form {
        background-color: #fff;
        margin-top: 1rem;
    }
    
    .input-container {
        display: flex;
        justify-content: space-between;
        padding: .6rem .8rem;
        border-bottom: 1px solid #f1f1f1;
    }
    
    .input-container input {
        font-size: .7rem;
        color: #666;
        border: none;
        outline: none;
    }
    
    .input-container button {
        font-size: .65rem;
        color: #fff;
        font-family: Helvetica Neue, Tahoma, Arial;
        padding: .28rem .4rem;
        border: 1px;
        border-radius: .15rem;
    }
    
    .captcha-code-container {
        height: 2.2rem;
    }
    
    .captcha-code-container .img-change-img {
        display: flex;
        align-items: center;
    }
    
    .captcha-code-container .img-change-img img {
        width: 3.5rem;
        height: 1.5rem;
    }
    
    .captcha-code-container .img-change-img .change-img {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        width: 2.5rem;
        justify-content: center;
    }
    
    .captcha-code-container .img-change-img .change-img p {
        font-size: .55rem;
        color: #666;
    }
    
    .captcha-code-container .img-change-img .change-img p:nth-of-type(2) {
        color: #3b95e9;
        margin-top: .2rem;
    }
    
    .botton-switch {
        background-color: #ccc;
        display: flex;
        justify-content: center;
        width: 2rem;
        height: 0.8rem;
        padding: 0 .2rem;
        border: 1px;
        border-radius: 0.5rem;
        position: relative;
    }
    
    .botton-switch .circle-button {
        transition: all .3s;
        position: absolute;
        top: -0.2rem;
        z-index: 1;
        left: -0.3rem;
        width: 1.2rem;
        height: 1.2rem;
        box-shadow: 0 0.026667rem 0.053333rem 0 rgba(0, 0, 0, .1);
        background-color: #f1f1f1;
        /* border: 1px; */
        border-radius: 50%;
    }
    
    .botton-switch .transToRight {
        transform: translateX(1.3rem);
    }
    
    .botton-switch span {
        font-size: .45rem;
        color: #fff;
        transform: translateY(.05rem);
        line-height: 0.6rem;
    }
    
    .botton-switch span:nth-of-type(2) {
        transform: translateY(-0.08rem);
    }
    
    .changeToText {
        background-color: #4cd964;
    }
    
    .login-tips {
        font-size: .5rem;
        color: red;
        padding: .4rem .6rem;
        line-height: .5rem;
    }
    
    .login-button {
        margin: 0 .5rem 1rem;
        font-size: .7rem;
        color: #fff;
        background-color: #4cd964;
        padding: .5rem 0;
        border: 1px;
        border-radius: .15rem;
        text-align: center;
    }
    
    .to-forget {
        float: right;
        font-size: .6rem;
        color: #3b95e9;
        margin-right: .3rem;
    }
</style>