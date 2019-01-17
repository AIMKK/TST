<template>
    <b-container fluid id="main">
        <b-row class="my-1">
            <b-col cols="12" sm="8" lg="4" offset-sm="2" offset-lg="4">
                <div class="body">
                    <div class="title">
                        <b>iRMS</b>
                    </div>
                    <div class="text-left">
                        <b-form-group label-for="loginID">
                            <i class="fa fa-user fa-lg"></i>
                            <b-form-input id="loginID" v-model.trim="userCode" placeholder="LoginID"></b-form-input>
                        </b-form-group>
                        <b-form-group label-for="password">
                            <b-form-input id="password" type="password" v-model.trim="password" placeholder="Password"
                                @keyup.native.enter="login"></b-form-input>
                        </b-form-group>
                        <b-button variant="success" id="btnLogin" @click="login" :disabled="btnLoginDisable" block>Login</b-button>
                    </div>
                </div>
            </b-col>
        </b-row>
        <b-modal v-model="modalShow" title="iRMS" size="sm" ok-only>
            {{modalMessage}}
        </b-modal>
    </b-container>
</template>
<script>
    import { mapState } from 'vuex';
    import { mapMutations } from 'vuex';
    import axios from 'axios';
    import apiUrl from '@/service-api-config.js';
    export default {
        data() {
            return {
                userCode: '',
                password: '',
                btnLoginDisable: false,
                modalMessage: '',//modal ui msg
                modalShow: false,//modal ui show
            }
        },
        computed: {
            ...mapState([
                'loginUserCode'
            ])
        },
        methods: {
            login() {
                sessionStorage.removeItem('userInfo');
                this.btnLoginDisable = true;
                if (this.userCode.trim().length == 0) {
                    this.btnLoginDisable = false;
                    this.modalMessage = "请输入用户名！";
                    this.modalShow = true;
                }
                else if (this.password == "") {
                    this.btnLoginDisable = false;
                    this.modalMessage = "请输入密码！";
                    this.modalShow = true;
                    //"请输入密码！"
                } else {
                    //check user password senddata,receive,huoqushujule,
                    axios({
                        url: apiUrl.login,
                        method: 'post',
                        data: {
                            userCode: this.userCode,
                            password: this.password
                        }
                    }).then((response) => {                                           
                        if (response.data.code == 200 && response.data.message) {
                            // console.log(response.data.message)
                            this.setLoginUserInfo(response.data.message)
                            //
                            sessionStorage.setItem('userInfo', JSON.stringify(response.data.message));
                            //如果成功跳转到 主界面，目前 跳转到上次次
                            if (this.loginUserCode) {
                                var sku = this.$route.query.skuno;//先通过路径来找                                   
                                if (!sku) {//如果路径上没找到，就通过 参数来找
                                    sku = this.$route.params.skuno;
                                }
                               
                                this.$router.push({
                                    path: '/quote',
                                    query: {
                                        skuno: sku
                                    }
                                });
                            }
                        } else {
                            this.btnLoginDisabled = false;
                            this.modalMessage = "用户名或密码不正确!";
                            this.modalShow = true;

                        }

                    }).catch((error) => {
                        this.btnLoginDisabled = false;
                        this.modalMessage = "无法登录!";
                        this.modalShow = true;
                    });
                }
            },
            ...mapMutations([
                'setLoginUserInfo',

            ]),
        },
    }
</script>
<style scoped>
    #main {
        padding-left: 5px;
        padding-right: 5px;
    }

    #main .body {
        background: #ffffff;
        padding: 20px 15px;
        text-align: center;
        border: 1px solid #DFDFDF;
        margin-top: 30px;
    }

    #main .body .title {
        margin-bottom: 20px;
    }

    #btnLogin {
        margin-top: 30px;        
    }
</style>