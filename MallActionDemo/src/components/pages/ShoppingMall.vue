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
                    <img v-lazy="banner.image" alt="" width="100%">
                </van-swipe-item>
            </van-swipe>
        </div>
        <!--type bar-->
        <div class="type-bar">
            <div v-for="(cate,index) in category" :key="index">
                <img v-lazy="cate.image" alt="" width="90%"/>
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>
        <!--adbanner area-->
        <div>
            <img v-lazy="adBanner" width="100%"/>
        </div>
        <!--recommend area-->
        <div class="recommend-area">   
            <div class="recommend-title">   
                商品推荐
            </div>
            <div class="recommend-body">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
                        <div class="recommend-item">
                            <img :src="item.image" width="80%"/>
                            <div>{{item.goodsName}}</div>
                            <div>￥{{item.price}}(￥{{item.mallPrice}})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import 'swiper/dist/css/swiper.css'
    import {swiper,swiperSlide}from 'vue-awesome-swiper'
    export default {
        data() {
            return {
                msg: 'shopping mall',
                locationIcon:require('../../assets/images/location.png'),
                bannerPicArr:
                [],
                 category:[],
                 adBanner:'',
                 recommendGoods:[],
                 swiperOption:{
                     slidesPerView:3,
                 },
            }
           
        },
        components:{
            swiper,swiperSlide
        },
        created(){
            axios({
                url:'https://easy-mock.com/mock/5b8bf81fba0d0467e7762af9/malltestdata/',
                method:'get'
            }).then(Response=>{
                console.log(Response)
                if (Response.status==200){
                    this.category=Response.data.data.category;
                    this.adBanner=Response.data.data.advertesPicture.PICTURE_ADDRESS;
                    this.bannerPicArr=Response.data.data.slides;
                    this.recommendGoods=Response.data.data.recommend;
                }
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
.type-bar{
    background-color: #fff;
    margin: 0 .3rem .3rem .3rem;
    border-radius:.3rem;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
.type-bar div{
    padding: .3rem;
    font-size: 12px;
    text-align: center;
}
.recommend-area{
    background-color: #fff;
    margin-top: .3rem;
}
.recommend-title{
    border-bottom: 1px solid #eee;
    font-size:14px;
    padding: .2rem;
    color: #e5017d;
}
.recommend-body {
    border-bottom: 1px solid #eee;
}
.recommend-item{
    width: 99%;
    border-right:1px solid #eee;
    font-size: 12px;
    text-align: center;
}
</style>