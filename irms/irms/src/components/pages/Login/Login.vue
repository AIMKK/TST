<template>
    <b-container fluid>
        <b-row class="my-1">
            <b-col sm="4">
                <P></P>
            </b-col>
            <b-col sm="4" class="container">
                <div>
                    <b>iRMS</b>
                </div>
                <div class="content text-left">
                    <div class="form-group">
                        <label for="loginID">Login ID:</label>
                        <input type="text" class="form-control" id="loginID" placeholder="Login ID" v-model="userCode" />
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" class="form-control" id="password" placeholder="Password" v-model="password" />
                    </div>
                    <b-button variant="success" id="btnLogin" @click="login" :disabled="btnLoginDisabled">Login</b-button>
                </div>
            </b-col>
            <b-col sm="4">
                <P></P>
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
                        console.log(response);
                        if (response.data.code == 200 && response.data.message) {
                            // new Promise((resolve, reject) => {
                            //     //localStorage.userInfo = { userName: this.username }
                            //     setTimeout(() => { resolve() }, 500);
                            // }).then(() => {
                            //     //Toast.success('login success');
                            //     this.$router.push('/');
                            // }).catch((error) => {
                            //     //Toast.fail('login status store fail')
                            //     console.log(error)
                            // })
                        } else {
                            this.modalMessage = "Login failed!";
                            this.$refs.myModalRef.show();
                            this.btnLoginDisabled = false;
                        }

                    }).catch((error) => {
                        this.modalMessage = "Login failed!";
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
    #btnLogin {
        width: 100%;
    }
</style>