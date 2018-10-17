<template>
    <div class="login-container">
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
                    <div class="chang-img" @click="getCaptchaCode">
                        <p>看不清</p>
                        <p>换一张</p>
                    </div>
                </div>
            </section>
        </div>
    </div>
  </template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                msg: 'login',
                showPassword: true,
                userAccount: '',
                password: '',
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .change-to-text {
        background-color: #4cd964;
    }
</style>