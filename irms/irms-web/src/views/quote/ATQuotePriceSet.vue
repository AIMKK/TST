<template>
    <b-container id="main">
        <b-card no-body header="<b>修理报价</b>">
            <div v-if="loadState==='loaded'">
                <b-card-body>
                    <b-row class="my-1">
                        <b-col cols="12" sm="6">
                            <label><span class="key"><b>SKU:</b></span><span class="value">{{Skuno}}</span></label>
                        </b-col>
                        <b-col cols="12" sm="6">
                            <label><span class="key"><b>模号:</b></span><span class="value">{{MountNo}}</span></label>
                        </b-col>
                        <b-col cols="12">
                            <label><span class="key"><b>描述:</b></span><span class="value">{{ChineseDescription}}</span></label>
                        </b-col>
                        <b-col sm="6" md="4" lg="3">
                            <label><span class="key"><b>人工成本:</b></span><span class="value">{{LaborCost , "",2 |
                                    formatMoney}}</span>{{Costcurrencycode}}</label>
                        </b-col>
                        <b-col sm="6" md="4" lg="3">
                            <label><span class="key"><b>材料成本:</b></span><span class="value">{{MatieralCost , "",2 |
                                    formatMoney}}</span>{{Costcurrencycode}}</label>
                        </b-col>
                        <b-col sm="6" md="4" lg="3">
                            <label><span class="key"><b>钻石成本:</b></span><span class="value">{{StoneCost, "",2 |
                                    formatMoney}}</span>{{Costcurrencycode}}</label>
                        </b-col>
                        <b-col sm="6" md="4" lg="3">
                            <label><span class="key"><b>共计:</b></span><span class="value">{{UnitCost, "",2 |
                                    formatMoney}}</span>{{Costcurrencycode}}</label>
                        </b-col>
                    </b-row>
                </b-card-body>
                <b-list-group flush>
                    <b-list-group-item class="flex-column align-items-start" v-for="(stone,index) in StoneInfo" :key="index">

                        <b>
                            <b-badge pill variant="secondary">{{index+1}}</b-badge> 钻石信息
                        </b>
                        <b-row class="my-1">
                            <b-col sm="6" md="4" lg="3">
                                <label><span class="key"><b>Lot:</b> </span><span class="value">{{stone.Lot}}</span></label>
                            </b-col>
                            <b-col sm="6" md="4" lg="3">
                                <label><span class="key"><b>钻石大小:</b></span><span class="value">{{stone.Size}}</span></label>
                            </b-col>
                            <b-col sm="6" md="4" lg="3">
                                <label><span class="key"><b class="key">是否主石:</b></span><span class="value">{{stone.MainStone
                                        | formatMainStone}}</span></label>
                            </b-col>
                            <b-col sm="6" md="4" lg="3">
                                <label><span class="key"><b>数量:</b></span><span class="value">{{stone.TotalQty}}</span></label>
                            </b-col>
                            <b-col sm="6" md="4" lg="3">
                                <label><span class="key"><b>钻石重量:</b></span><span class="value">{{stone.totalWeight,3 |
                                        formatNumber}}</span>CT</label>
                            </b-col>
                            <b-col sm="6" md="4" lg="3">
                                <label><span class="key"><b>钻石价值:</b></span><span class="value">{{stone.TotalCost, "",2
                                        | formatMoney}}</span>{{Costcurrencycode}}</label>
                            </b-col>
                        </b-row>
                    </b-list-group-item>
                </b-list-group>
                <b-card-body>
                    <div role="group">
                        <label for="quotePrice"><b>输入报价金额({{Costcurrencycode}}):</b></label>
                        <b-form-input id="quotePrice" type="number"></b-form-input>
                    </div>
                    <!-- <hr> -->
                    <div class="footer">
                        <b-row class="my-1">
                            <b-col cols="6" >
                                <b-button variant="secondary" block @click="exit">退出</b-button>
                            </b-col>
                            <b-col cols="6" >
                                <b-button variant="success" block>保存</b-button>
                            </b-col>
                        </b-row>
                    </div>
                   
                </b-card-body>

            </div>
            <div v-if="loadState==='loadError'">
                {{loadErrorInfo}}
            </div>
        </b-card>
    </b-container>
</template>
<script>
    import { mapState } from 'vuex'
    import axios from 'axios';
    import apiUrl from '@/service-api-config.js';
    import accounting from 'accounting';
    export default {
        data() {
            return {
                loadState: '',
                loadErrorInfo: '',
                Skuno: '',
                MountNo: '',
                MountImage: '',
                ChineseDescription: '',
                Costcurrencycode: '',
                ConfirmedDate: '',
                LaborCost: '',
                MatieralCost: '',
                StoneCost: '',
                UnitCost: '',
                StoneInfo: [],
            }
        },
        created() {
            var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            //不存在loginuser
            if (!userInfo || !userInfo.UserCode) {
                this.$router.push({ path: '/login' });
                // console.log('no login');
                return;
            }

            var sku = this.$route.query.skuno;
            console.log(sku);
            console.log(this.$route);
            //this.$route.query.goodsId?this.$route.query.goodsId:this.$route.params.goodsId;

            axios({
                url: apiUrl.quotePrice,
                method: 'post',
                data: {
                    skuno: '23895609'//'23895609'
                }
            }).then((response) => {
                console.log(response.data.code);
                console.log('response.data.message');
                console.log(response.data.message);
                if (response.data.code == 200 && response.data.message) {
                    if (response.data.message.length > 1) {
                        this.loadState = "loaded";
                        //console.log(response);
                        var mainInfo = response.data.message[0][0];
                        // console.log(mainInfo);
                        this.Skuno = mainInfo.Skuno;
                        this.MountNo = mainInfo.MountNo;
                        this.StoneCost = mainInfo.StoneCost;
                        this.LaborCost = mainInfo.LaborCost;
                        this.MountImage = mainInfo.MountImage;
                        this.UnitCost = mainInfo.UnitCost;
                        this.Costcurrencycode = mainInfo.Costcurrencycode;
                        this.ChineseDescription = mainInfo.ChineseDescription;
                        this.MatieralCost = mainInfo.MatieralCost;
                        //
                        this.StoneInfo = response.data.message[1];
                        // console.log(this.StoneInfo);
                    }
                } else {
                    console.log(response);
                    this.loadState = "nodata";
                }

            }).catch((error) => {
                console.log(error);
                this.loadState = "loadError";
                loadErrorInfo = error;
            });
        },
        filters: {
            formatMoney(money, prefix, precision) {
                return accounting.formatMoney(money, prefix, precision);
            },
            formatNumber(number, precision) {
                return accounting.formatNumber(number, precision);
            },
            formatMainStone(isMainStone) {
                return isMainStone ? "Y" : "N";
            }
        },
        methods: {
            exit(){
                sessionStorage.clear();
                this.$router.push({ path: '/login' });
            }
        },
        computed: mapState([
            'loginUserCode'
        ]),
    }
</script>
<style scoped>
    #main {
        padding: 5px;
    }

    @media screen and (max-width: 576px) {
        .key {
            display: inline-block;
            width: 95px;
            /* text-align: left; */
        }
    }

    .value {
        margin-left: 10px;
        margin-right: 5px;
    }

    .footer{
        margin-top: 25px;
    }
</style>