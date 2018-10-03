<template>
    <div>
       <van-nav-bar
        title="用户登陆"
        left-text="返回"
        left-arrow
        @click-left="goBack"
        />
        <div class="login-panel">
            <van-field
                v-model="username"
                label="用户名"
                icon="clear"
                placeholder="请输入用户名"
                required
                @click-icon="username=''"
                :error-message="usernameErrMsg"
            />
            <van-field
                v-model="password"
                type='password'
                label="密码"
                placeholder="请输入密码"
                required
                :error-message="passwordErrMsg"
            />
            <div class="login-button">
                <van-button type="primary" @click ="loginAct"
                 size="large" :loading="openLoading">
                    登陆
                </van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import url from '@/serviceAPI.config.js'
    import {Toast} from 'vant'
    export default {
        data() {
            return {
                username: '',
                password:'',
                openLoading:false,// register loading status
                usernameErrMsg:'',
                passwordErrMsg:'',
            }
        },
        created(){
            if(localStorage.userInfo){
                Toast.success('user is login');
                this.$router.push('/');
            }
        },
     methods:{
         goBack(){
             this.$router.go(-1);
         },
         loginAct(){
            
            this.checkForm()&&this.axiosLoginUser();
         },
         axiosLoginUser(){
             this.openLoading=true;
             axios({
                 url:url.login,
                 method:'post',
                 data:{
                     userName:this.username,
                     password:this.password
                 }
             })
             .then((response)=>{
                 
                 console.log(response);
                 if(response.data.code==200&&response.data.message){
                     
                    new Promise((resolve,reject)=>{
                    localStorage.userInfo={userName:this.username}
                    setTimeout(()=>{resolve()},500);
                    }).then(()=>{
                        Toast.success('login success');
                        this.$router.push('/');
                    }).catch((error)=>{
                        Toast.fail('login status store fail')
                        console.log(error)
                    })
                 }else{
                    Toast.fail('login fail') 
                    this.openLoading=false;
                 }

             }).catch((error)=>{
                Toast.fail('login fail')
                 this.openLoading=false;
                
             })
         },
         //check login vaild
         checkForm(){
             let isOk=true;
             if(this.username.length<5){
                 this.usernameErrMsg="the len of user name must more than 5"
                isOk=false;
             }else{
                 this.usernameErrMsg="";
             }
             if(this.password.length<6){
                this.passwordErrMsg="the len of password must more than 6"
                isOk=false;
             }else{
                 this.passwordErrMsg="";
             }
            return isOk;
         }
     }   
    }
</script>

<style scoped>
.login-panel{
    width: 96%;
    border-radius: 5px;
    margin: 20px auto;
    padding-bottom: 80px;
}
.login-button{
    padding-top: 10px;
}
</style>