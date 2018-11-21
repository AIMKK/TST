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
                    <div class="footer">
                        <b-row class="my-1">
                            <b-col cols="6">
                                <b-button variant="secondary" block @click="exit">退出</b-button>
                            </b-col>
                            <b-col cols="6">
                                <b-button variant="success" block @click="saveQuote">保存</b-button>
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
            // console.log(this.$route);          
            var sku = this.$route.query.skuno;//先通过路径来找
            if (!sku) {//如果路径上没找到，就通过 参数来找
                sku = this.$route.params.skuno;
            }
            if (!userInfo || !userInfo.UserCode) {
                this.$router.push({
                    name: 'login',
                    params: {
                        skuno: sku
                    }
                });
                return;
            }
            // //临时测试 写死
            // if (!sku) {
            //     sku = '23895609';
            // }
            if (!sku) {//如果还是没有sku那么说明数据不正确了
                //显示提示信息，alert？model box？
                return;
            }

            axios({
                url: apiUrl.quotePrice,
                method: 'post',
                data: {
                    skuno: sku
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
            exit() {
                sessionStorage.clear();
                this.$router.push({ path: '/login' });
            },
            saveQuote() {
                //保存数据//atQuoteSave
                axios({
                    url: apiUrl.quoteSave,
                    method: 'post',
                    data: {
                        //组织数据传递过去
                        workshopOrderMaster: {
                            OrderDate: new Date(),
                            WorkShopOrderNo: '',
                            WorkShopCode: '99999999',
                            PrintChopCode: '',
                            LocationCode: 'hk992',
                            PickUpLocation: 'hk992',
                            Salesman: '1',
                            VIPCode: 'tester',
                            VIPName: '',
                            FactoryQuotePrice: '0.1',
                            FactoryQuoteDate: new Date(),
                            FactoryQuoteUserCode: '1',
                            WorkShopRemark: 'test'
                        },
                        workShopOrderDetail: {
                            WorkShopOrderNo:'',
                            SequenceNo:'1',
                            InvoiceNo:'',
                            InvoiceSN:null,
                            SkuNo:this.Skuno.substring(0,8),
                            SkuDit:this.Skuno.substring(9,10),
                            OrderQty:'1',
                            UpdateUserCode:'1'
                        }
                    }
                }).then((response) => {
                    console.log('response.data.message');
                    console.log(response);
                    if (response.data.code == 200 && response.data.message) {

                    }
                }).catch((error) => {
                    console.log(error);
                });
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

    .footer {
        margin-top: 25px;
    }
</style>