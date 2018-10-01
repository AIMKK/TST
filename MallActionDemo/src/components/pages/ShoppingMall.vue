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
                            <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice|moneyFilter}})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <floor-component :floorData="floor1" :floorTitle="floorName.floor1">

        </floor-component>
        <floor-component :floorData="floor2" :floorTitle="floorName.floor2">

        </floor-component>
        <floor-component :floorData="floor3" :floorTitle="floorName.floor3">

        </floor-component>
        
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
                <van-list>
                    <van-row gutter="20">
                        <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                          <goods-info :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price">

                          </goods-info>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import 'swiper/dist/css/swiper.css'
    import {swiper,swiperSlide}from 'vue-awesome-swiper'
    import floorComponent from '../component/floorComponent'
    import {toMoney} from '@/filter/moneyFilter.js'
    import goodsInfo from '../component/goodsInfoComponent'
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
                 floor1:[],
                 floor2:[],
                 floor3:[],
                 floorName:{},
                 hotGoods:[],
            }
           
        },
        filters:{
            moneyFilter(money){
                return toMoney(money);
            }
        },
        components:{
            swiper,swiperSlide,floorComponent,goodsInfo
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
                    this.floor1=Response.data.data.floor1;
                    this.floor2=Response.data.data.floor2;
                    this.floor3=Response.data.data.floor3;
                    this.floorName=Response.data.data.floorName;
                    this.hotGoods=Response.data.data.hotGoods;
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
.hot-area{
    text-align: center;
    font-size: 14px;
    height: 1.8rem;
    line-height: 1.8rem;
}

</style>