<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar title="购物车"
            />
        </div>
        <div class="cart-title">
            <van-button size="small" type="danger" @click="clearCart" plain>
                清空购物车
            </van-button>
        </div>
        <div class="cart-list">
            <div class="main-row" v-for="(item,index) in cartInfo" :key="index">
                <div class="main-img">
                    <img :src="item.image" width="100%" />
                </div>
                <div class="main-text">
                    <div class="main-goods-name">
                        {{item.name}}
                    </div>
                    <div class="main-control">
                        <van-stepper v-model="item.count">

                        </van-stepper>
                    </div>
                </div>
                <div class="main-goods-price">
                    <div>
                        ￥{{item.price | moneyFilter}}
                    </div>
                    <div>
                        x{{item.count}}
                    </div>
                    <div class="sumPrice">
                        ￥{{item.price*item.count | moneyFilter}}
                    </div>
                </div>
            </div>
        </div>
        <div class="totalAmnt">
            商品总价格:￥{{totalAmnt | moneyFilter}}
        </div>
    </div>
    
</template>

<script>
    import {toMoney} from '@/filter/moneyFilter.js'
    export default {
        data() {
            return {
                cartInfo: [],
                isEmpty:false,
                
            }
        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        },
        created(){
            this.getCartInfo()
        },
        computed:{
            totalAmnt(){
                let totalPrice=0;
                this.cartInfo.forEach((item,index) => {
                    totalPrice=totalPrice+(item.price*item.count);
                });
                localStorage.cartInfo=JSON.stringify(this.cartInfo)
                return totalPrice;
            }
        },
        methods: {
            getCartInfo() {
                if(localStorage.cartInfo){
                    this.cartInfo=JSON.parse(localStorage.cartInfo)
                }
                console.log('this.cartInfo'+JSON.stringify(this.cartInfo))
                this.isEmpty=this.cartInfo.length >0?true:false;
            },
            clearCart(){
                localStorage.removeItem('cartInfo')
                this.cartInfo=[]
            }
        },
    }
</script>

<style scoped>
.cart-title{
    height: 2rem;
    line-height: 2rem;
    background-color: #fff;
    border-bottom: 1px solid #e4e7ed;
    padding: 5px;
    text-align: right;
}
.cart-list{
    background-color: #fff;

}
.main-row{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding:0.5rem;
    font-size: 0.85rem;
    border-bottom: 1px solid #e4e7ed;
}
.main-img{
    flex:6;

}
.main-text{
    flex:14;
    padding-left: 10px;

}
.main-control{
    padding-top: 10px;
}
.main-goods-price{
    flex: 4;
    text-align: right;
}
.sumPrice{
    color: red
}
.totalAmnt{
    text-align: right;
    background-color: #fff;
    border-bottom: 1px solid #e4e7ed;
    padding: 5px;
}
</style>