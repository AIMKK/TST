<template>
    <div class="login-container">
        <x-header :left-options="{showBack: false}" :right-options="{showMore: true}" style="width: 100%; position: absolute; left: 0px; top: 0px; z-index: 100;"
            @on-click-more="headerMoreBtnClick">
            <div>iRMS</div>
        </x-header>
        <div class="login-body">
            <div class="login-body-content" v-if="isSupportUserAgent">
                <group label-width="4.5em" label-margin-right="1em" label-align="right">
                    <x-input :title="$t('loginLangs.User:')" placeholder="user" v-model="userCode">
                        <!-- <x-icon slot="label" type="person" style="fill:#35495E;" ></x-icon> -->
                    </x-input>
                    <x-input :title="$t('loginLangs.Pwd:')" type="password" placeholder="password" v-model="password"
                    @keyup.native.enter="loginBtnClick">
                    </x-input>
                    <!-- <x-input :title="$t('loginLangs.Location:')" placeholder="location" v-model="loginLocation">
                    </x-input> -->
                </group>
                <div class="Login-btn">
                    <group>
                        <x-button type="primary" :disabled="loginBtnDisable" @click.native="loginBtnClick">{{$t('loginLangs.Login')}}</x-button>
                    </group>
                </div>
            </div>
            <div class="login-body-content"  v-else>
                <p>请使用【微信/支付宝】扫码打开此应用</p>
            </div>
        </div>
        <toast v-model="showToast" type="text" :width="tostWidth" :time="tostShowTime" is-show-mask :text="tostMsg"
            :position="position">
        </toast>

        <div v-transfer-dom>
            <loading :show="showLoading" :text="loadingTxt"></loading>
        </div>
        <action-sheet v-model="showMoreActSheet" :menus="loginMoreMenus" @on-click-menu="actSheetMenuClick" 
             theme="android">

        </action-sheet>
    </div>
</template>
<script>
    import axios from 'axios';
    import apiUrl from '@/service-api-config.js';
    import {getLangCodeByKey,isSupportUserAgent} from '@/comm-func.js';
    import {
        XInput, XButton, Box, Toast, Loading, TransferDom
    } from 'vux';
    //
    export default {
        data() {
            return {
                userCode: '',
                password: '',
                loginLocation: '',
                loginBtnDisable: false,
                position: 'default',
                showToast: false,
                tostShowTime: 1000,
                tostMsg: '',
                tostWidth: '12em',
                showLoading: false,
                loadingTxt: '',
                showMoreActSheet: false,
                isSupportUserAgent:false,
            }
        },
        components: {
            XInput,
            XButton,
            Box,
            Toast,
            Loading,

        },
        directives: {
            TransferDom
        },
        created:function(){
            this.isSupportUserAgent=isSupportUserAgent();
        },
        methods: {
            //
            loginBtnClick() {
                // sessionStorage.setItem('userInfo', JSON.stringify('abc'));
                // this.position = 'middle'
                var loginUser = this.userCode || '';
                var loginPwd = this.password || '';
                var loaginLoc = this.loginLocation || '';
                //
                if (loginUser.trim().length == 0) {
                    this.setToastInner(true, this.$t("loginLangs.LoginUserCanotEmpty"));
                    return;
                }
                //
                if (loginPwd.trim().length == 0) {
                    this.setToastInner(true, this.$t("loginLangs.LoginPwdCanotEmpty"));//
                    return;
                }
                //
                // if (loaginLoc.trim().length == 0) {
                //     this.setToastInner(true, this.$t("loginLangs.LoginLocCanotEmpty"));
                //     return;
                // }
                //验证用户名密码，并且用户所在的位置是否有权限。
                this.loginInner(loginUser, loginPwd);
            },
            //
            loginInner(userID, pwd) {
                this.setLoadingInner(true);
                axios({
                    url: apiUrl.login,
                    method: 'post',
                    data: {
                        userCode: userID,
                        password: pwd
                    }
                }).then((response) => {
                    if (response.data.code == 200 && response.data.message) {
                        console.log(response.data.message)
                        var loginInfo={
                            userCode:userID,
                            loginLocation:this.loginLocation,
                        }
                        // sessionStorage.removeItem('userInfo');
                        sessionStorage.setItem('loginInfo', JSON.stringify(loginInfo));
                        this.setLoadingInner(false);
                        //如果成功跳转到 主界面，目前 跳转到上次次
                        this.$router.push({
                            path: '/main',
                            // query: {
                            //     skuno: sku
                            // }
                        });
                    } else {
                        this.setLoadingInner(false);
                        this.setToastInner(true, this.$t("loginLangs.ChkUserOrPwdForFailedLogin"), "20em", 2000)
                    }
                }).catch((error) => {
                    console.log(error)
                    this.setLoadingInner(false);
                    this.setToastInner(true, error,"20em",20000)
                });
            },
            //
            setToastInner(show, msg, width, showTime) {
                this.showToast = !!show;
                this.tostMsg = msg;
                if (width) {
                    this.tostWidth = width;
                }
                if (showTime) {
                    this.tostShowTime = showTime;
                }
            },
            //
            setLoadingInner(show, txt) {
                this.showLoading = !!show;
                this.loadingTxt = txt;
            },
            //
            headerMoreBtnClick() {
                this.showMoreActSheet = true;
            },
            actSheetMenuClick(key) {               
                this.$i18n.locale =getLangCodeByKey(key);               
            },

        },
        computed: {
            // actSheetCancelTxt: function () {
            //     return this.$t("moreBtnForCommLangs.Cancel");
            // },
            loginMoreMenus: function () {
                return {
                    // chngLang: this.$t("moreBtnForCommLangs.ChngLang"),
                    CHS: this.$t("moreBtnForCommLangs.CHSLang"),
                    CHI: this.$t("moreBtnForCommLangs.CHILang"),
                    ENG: this.$t("moreBtnForCommLangs.ENGLang"),                   
                }
            },
        }
    }

</script>
<style>
    .login-container {
        box-sizing: border-box;
        padding-top: 46px;
        height: 100%;
        width: 100%;
        overflow-x: hidden;
        overflow-y: hidden;
        background-color: #fff;
    }

    .login-body {
        height: 100%;
        /* background: cadetblue; */
        overflow-x: hidden;

    }

    .login-body-content {
        padding: 20px 0px;
    }

    .login-title {
        margin-bottom: 20px;
        text-align: center;
        
    }

    .Login-btn {
        padding: 10px 2px 0px 2px;
    }

    .loginMorePopup {
        padding-bottom: 15px;
        height:200px;

    }
</style>