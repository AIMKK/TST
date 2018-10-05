<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar
            title="类别列表"
            />
        </div>
        <div>
            <van-row>
                <van-col span="6">
                    <div id="leftNav">
                       <ul>
                           <li @click="clickCategory(index,item.ID)" :class="{categoryActive:categoryIndex==index}" v-for="(item,index) in category" :key="index" >
                               {{item.MALL_CATEGORY_NAME}}
                           </li>
                       </ul>
                    </div>
                </van-col>
                <van-col span="18">
                    <div class="tabCategorySub">
                        <van-tabs v-model="active" @click="onClickCategorySub">
                            <van-tab :title="item.MALL_SUB_NAME" v-for="(item,index) in categorySub" :key="index">

                            </van-tab>
                        </van-tabs>
                    </div>
                    <div id="list-div">
                        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">

                            <van-list v-model="loading" :finished="finished" @load="onload">
                                <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item,index) in goodList" :key="index">
                                    <div class="list-item-img">
                                        <img :src="item.IMAGE1" width="100%"
                                        :onerror="errorImg"/>
                                    </div>
                                    <div class="list-item-text">
                                        <div>{{item.NAME}}</div>
                                        <div>￥{{item.ORI_PRICE | moneyFilter}}</div>
                                    </div>
                                </div>
                            </van-list>
                        
                        </van-pull-refresh>
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import url from '@/serviceAPI.config.js'
    import {toMoney} from '@/filter/moneyFilter.js'
    export default {
        data() {
            return {
                category: [],
                categoryIndex:0,
                categorySub:[],
                active:0,//active index
                loading:false,
                finished:false,//上拉
                page:1,//商品列表页数
                isRefresh:false,//下拉刷新
                goodList:[],//商品列表信息
                categorySubId:'',//商品子类id
                errorImg:'this.src="'+require('@/assets/images/errorimg.png')+'"',
            }
        },
        filters:{
            moneyFilter(money){
                return toMoney(money);
            }
        },
        created(){
            this.getCategory();
            
        },
        mounted(){
            let wHeight=document.documentElement.clientHeight;
            document.getElementById('leftNav').style.height=wHeight-46-50+'px';
            document.getElementById('list-div').style.height=wHeight-90-50+'px';
        },
        methods: {
            getCategory() {
                axios({
                    url:url.getCategoryList,
                    method:'get',
                }).then((response)=>{
                    console.log(response)
                    if(response.data.code==200&&
                    response.data.message!=null){
                        this.category=response.data.message;  
                        if(this.category!=null&&this.category.length>0){
                            this.getCategorySubByCategoryId(this.category[0].ID);
                        }
                        
                    }else{
                        Toast('get data error')
                    }
                }).catch(error=>{
                    console.log(error)
                })
            },
            clickCategory(index,categoryId){
                this.categoryIndex=index;
                this.page=1;
                this.finished=false;
                this.goodList=[];
                this.getCategorySubByCategoryId(categoryId);
                
            },
            getCategorySubByCategoryId(categoryId){
                axios({
                    url:url.getCategorySubList,
                    method:'post',
                    data:{categoryId:categoryId}
                }).then((response)=>{
                    console.log(response);
                    if(response.data.code==200&&
                    response.data.message!=null){
                        this.categorySub=response.data.message;
                        this.active=0;
                        this.categorySubId=this.categorySub[0].ID;
                        this.onload();
                    }else{
                        Toast('get data error')
                    }
                }).catch(error=>{
                    console.log(error)
                })
            },
            onload(){
                setTimeout(()=>{
                   this.categorySubId=this.categorySubId?this.categorySubId:this.categorySub[0].ID;
                   this.getGoodList();
                },1000)
            },
            onRefresh(){
                setTimeout(()=>{
                    this.isRefresh=false;
                    this.finished=false;
                    this.goodList=[];
                    this.page=1;                    
                    this.onload();

                },500)
            },
            getGoodList(){
                axios({
                    url:url.getGoodsListByCategorySubId,
                    method:'post',
                    data:{
                        categorySubId:this.categorySubId,
                        page:this.page,
                    }
                }).then((response)=>{
                    console.log(response);
                    if(response.data.code==200&&
                    response.data.message.length>0){
                        this.page++;
                        this.goodList=this.goodList.concat(response.data.message)
                    }else{
                        this.finished=true;
                    }
                    this.loading=false;
                }).catch(error=>{
                    console.log(error)
                })
            },
            onClickCategorySub(index,title){
                this.categorySubId=this.categorySub[index].ID;
                console.log('categorySubId'+this.categorySubId)
                this.goodList=[]
                this.finished=false;
                this.page=1;
                this.onload();
            },
            goGoodsInfo(goodId){
                this.$router.push({
                    name:'Goods',
                    params:{goodsId:goodId}
                })
            }
        },
    }
</script>

<style scoped>
#leftNav{
    background: aliceblue;
}
#leftNav ul li{
    line-height: 2rem;
    border-bottom: 1px solid #e4e7ed;
    padding: 3px;
    font-size: 0.8rem;
    text-align: center;
}
.categoryActive{
    background-color: #fff;
}
.list-item{
        display: flex;
        flex-direction: row;
        font-size:0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding:5px;
    }
    #list-div{
        overflow: scroll;
    }
    .list-item-img{
        flex:8;
    }
    .list-item-text{
        flex:16;
        margin-top:10px;
        margin-left:10px;
    }
</style>