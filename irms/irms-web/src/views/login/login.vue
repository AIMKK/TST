<template>
    <b-container fluid>
        <b-row class="my-1">
            <b-col cols="12" sm ="8" lg="4"  offset-sm="2"  offset-lg="4" class="container">
                <div class="main">
                    <div class="header">
                        <b>iRMS</b>
                    </div>
                    <div class="text-left">
                        <b-form-group  label="Login ID:" label-for="loginID">
                            <b-form-input id="loginID" v-model.trim="userCode" placeholder="LoginID"></b-form-input>
                        </b-form-group>
                        <b-form-group  label="Password:" label-for="password">
                            <b-form-input id="password" type="password" v-model.trim="password" placeholder="Password"></b-form-input>
                        </b-form-group>
                        <b-button variant="success" id="btnLogin" @click="login" :disabled="btnLoginDisabled" block>Login</b-button>
                    </div>
                </div>
            </b-col>

        </b-row>
        <b-modal ref="myModalRef">
            {{modalMessage}}
        </b-modal>
    </b-container>
</template>
<script>
    import axios from 'axios';
    import apiUrl from '@/service-api-config.js';
    export default {
        data() {
            return {
                btnLoginDisabled: false,
                userCode: '',
                password: '',
                modalMessage: ''
            }
        },
        methods: {
            login() {
                this.btnLoginDisabled = true;
                if (this.userCode == "" || this.password == "") {
                    this.btnLoginDisabled = false;
                    this.modalMessage = "Login ID or password can't empty!";
                    this.$refs.myModalRef.show();
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
                            console.log(response.data.message)
                        } else {
                            console.log(response);
                            this.modalMessage = "check userID and passworld!";
                            this.$refs.myModalRef.show();
                            this.btnLoginDisabled = false;
                        }

                    }).catch((error) => {
                        console.log(error);
                        this.modalMessage = "check userID and passworld!";
                        this.$refs.myModalRef.show();
                        this.btnLoginDisabled = false;
                    });
                }
            },
            hideModal() {
                this.$refs.myModalRef.hide()
            }
        },
    }
</script>
<style scoped>   
    .container .main {
        background: #ffffff;
        padding: 20px 15px;
        text-align: center;
        border: 1px solid #DFDFDF;
        margin-top: 10px;   
    }
</style>