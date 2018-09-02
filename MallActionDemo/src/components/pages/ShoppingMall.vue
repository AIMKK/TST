<template>
    <div>
        <div class="search-bar">
            <van-row class="test-row">
                <van-col span="3">
                    <img :src="locationIcon" alt="" width="80%" class="location-icon" /></van-col>
                <van-col span="16"><input type="input" class="search-input"></van-col>
                <van-col span="5">
                    <van-button size="mini">查找</van-button>
                </van-col>
            </van-row>
        </div>
        <!--swiper-->
        <div class="swiper-area">   
            <van-swipe :autoplay="1000">
                <van-swipe-item v-for="(banner,index) in bannerPicArr" :key="index">
                    <img v-lazy="banner.imageUrl" alt="" width="100%">
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                msg: 'shopping mall',
                locationIcon:require('../../assets/images/location.png'),
                bannerPicArr:
                [{imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic001.jpg'},
                {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic002.jpg'},
                {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic003.jpg'}]
            }
        },
        created(){
            axios({
                url:'https://easy-mock.com/mock/5b8bf81fba0d0467e7762af9/malltestdata/',
                method:'get'
            }).then(Response=>{
                console.log(Response)
            }).catch(error=>{
                console.log(error)
            })
        }
    }
</script>

<style scoped>
.search-bar{
    height: 2.2rem;
    background-color: #e5017d;
    line-height: 2.2rem;
    overflow: hidden;
}
.location-icon{
    width: 1.8rem;
    height: 1.8rem;
    padding-top: 0.3rem;
    padding-left: 0.3rem;
}
.search-input{
    width: 100%;
    height: 1.3rem;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 1px solid #fff;
    background-color: #e5017d;
    color: #fff;
}
.swiper-area{
    clear:both;
    max-height: 12rem;
    overflow: hidden;
}
</style>