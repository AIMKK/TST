<template>
    <div id="head-top">
        <header class="header">
            <slot name="logo"></slot>
            <slot name="search"></slot>
            <section class="head-goback" v-if="goBack" @click="$router.go(-1)">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
                </svg>
            </section>
            <router-link :to="userInfo?'/profile':'/login'" v-if='signinUp' class="head-login">
                <svg class="user-avatar" v-if="userInfo">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
                    </svg>
                    <span class="login-span" v-else>登录|注册</span>
            </router-link>
            <section class="head-title ellipsis" v-if="headTitle">
                <span class="title-text">{{headTitle}}</span>
            </section>
            <slot name="edit"></slot>
            <slot name="changeLogin"></slot>
        </header>
    </div>
    
</template>
<script>
    import {
        mapState,
        mapActions
    } from 'vuex';
    export default {
        data() {
            return {}
        },
        mounted() {
            //this.getUserInfo();
        },
        props: ['signinUp', 'headTitle', 'goBack'],
        computed: {
            ...mapState(['userInfo']),
        },
        methods: {
            ...mapActions(['getUserInfo'])
        },
    }
</script>
<style scoped>
    #head-top {
        position: absolute;
        z-index: 100;
        left: 0;
        top: 0;
        width: 100%;
        padding: 0;
        background-color: #3190e8;
        height: 1.95rem;
        padding: .2rem 0;
    }
    
    #head-top .header {
        /* background-color: #3190e8;
        height: 1.95rem;
        padding: .2rem 0; */
    }
    
    .head-goback {
        left: 0.4rem;
        width: 0.6rem;
        height: 1rem;
        line-height: 2.2rem;
        margin-left: .4rem;
    }
    
    .head-login {
        right: .55rem;
        font-size: .65rem;
        color: #fff;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    
    .head-login .login-span {
        color: #fff;
    }
    
    .head-login .user-avatar {
        fill: #fff;
        width: .8rem;
        height: .8rem;
    }
    
    .head-title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    
    .head-title .title-text {
        font-size: .8rem;
        color: #fff;
        font-weight: bold;
    }
</style>