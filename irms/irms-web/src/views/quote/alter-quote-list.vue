<template>
    <div class="quote-container">
        <div style="width: 100%; position: absolute; left: 0px; top: 0px; z-index: 100;">
            <x-header :left-options="{showBack: true}" :right-options="{showMore: true}"
                @on-click-more="headerMoreBtnClick">

                <div>iRMS</div>
            </x-header>
            <div style="color:#ccc;font-size: 12px; position: absolute; top: 30px; left:80px;  ">
                <!-- <x-icon type="person" size="15" style="fill:#fff;"></x-icon><span style="position:relative; top: -2px; margin-right: 10px;">{{userCode}}</span>
                    <x-icon type="home" size="15" style="fill:#fff;"></x-icon><span style="position:relative; top: -2px; margin-right: 10px;">{{locationCode}}</span> -->
                <svg style="width:14px;height:14px;fill: #fff;" aria-hidden="true">
                    <use xlink:href="#icon-user"></use>
                </svg><span style="position:relative; top: -1px; margin-right: 10px;">{{userCode}}</span>
                <svg style="width: 14px;height:14px;fill: #fff;" aria-hidden="true">
                    <use xlink:href="#icon-shouye"></use>
                </svg><span style="position:relative; top: -1px; margin-right: 10px;">{{locationCode}}</span>
            </div>
        </div>

        <div class="quote-body">
            <div class="quote-body-content">

                <div class="aaa">
                    <card :header="{title:'待报价:ATHK021-2019-000125'}" :footer="{title: '开始报价',link:''}">
                        <!-- <div slot="header"> 待报价:ATHK021-2019-000125</div> -->
                        <div slot="content" class="card-padding">
                            <!-- <div class="shortInfo"><span class="shortInfoName">店铺:</span>hk021</div>
                            <div class="shortInfo"><span class="shortInfoName">销售员:</span>123456</div>
                            <div class="shortInfo"><span class="shortInfoName">Vip:</span>123456</div>
                            <div class="shortInfo"><span class="shortInfoName">SKU:</span>123456</div>
                            <div class="shortDesc">
                                <p style="font-size:14px;line-height:1.5;">18K/750 白色黄金 钻石镶嵌 颈链 金重:24.50克 英寸:18 1粒 梨形 钻石
                                    总重量:1.11卡 色泽:G 净度:VS1 4粒 圆形 钻石 总重量:0.39卡 证书:(G.I.A.:1229909190 ) 201粒 圆形 钻石
                                    总重量:7.21卡
                                </p>
                            </div> -->
                            <div>
                                <x-table full-bordered style="background-color:#fff;">
                                    <thead>
                                        <tr>
                                            <th colspan="4">汇总信息</th>
                                            <!-- <th>Price</th>
                                      <th>Quantity</th> -->
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>SKU</td>

                                            <td>1234568</td>
                                            <td>Mount</td>

                                            <td>$1.25 x 10</td>
                                        </tr>
                                        <tr>
                                            <td>Vip</td>

                                            <td>1234568</td>
                                            <td>salesman</td>

                                            <td>$1.25 x 10</td>
                                        </tr>
                                        <tr>
                                            <td>SKU</td>

                                            <td>1234568</td>
                                            <td>Mount</td>

                                            <td>$1.25 x 10</td>
                                        </tr>
                                        <tr>
                                            <td>SKU</td>

                                            <td>1234568</td>
                                            <td>Mount</td>

                                            <td>$1.25 x 10</td>
                                        </tr>
                                        <tr>
                                            <td colspan="4">Description</td>
                                           
                                            <!-- <td>x 08</td> -->
                                        </tr>
                                        <tr>
                                                <td style="line-height:1.5;" colspan="4">18K/750 白色黄金 钻石镶嵌 颈链
                                                        金重:24.50克 英寸:18 1粒 梨形 钻石
                                                        总重量:1.11卡 色泽:G 净度:VS1 4粒 圆形 钻石 总重量:0.39卡 证书:(G.I.A.:1229909190 ) 201粒 圆形
                                                        钻石
                                                        总重量:7.21卡
                                                    </td>
                                        </tr>
                                        <tr>
                                            <td colspan="4">
                                                <x-table full-bordered style="background-color:#fff;">
                                                    <!-- <thead>
                                                        <tr>
                                                            <th colspan="4">钻石明细</th>
                                                        </tr>
                                                    </thead> -->
                                    <tbody>
                                        <tr>
                                            <td colspan="4">钻石明细1</td>
                                        </tr>
                                        <tr>
                                            <td>Lot</td>
                                            <td>NA6810-A</td>
                                            <td>砖石大小</td>
                                            <td>AA0003825</td>
                                        </tr>
                                        <tr>
                                            <td>是否主石</td>
                                            <td>Y</td>
                                            <td>数量</td>
                                            <td>1</td>
                                        </tr>
                                        <tr>
                                            <td>重量</td>
                                            <td>0.017CT</td>
                                            <td>钻石价值</td>
                                            <td>70.55HKD</td>
                                        </tr>
                                        <tr>
                                                <td colspan="4">钻石明细2</td>
                                            </tr>
                                        <tr>
                                                <td>Lot</td>
                                                <td>NA6810-A</td>
                                                <td>砖石大小</td>
                                                <td>AA0003825</td>
                                            </tr>
                                            <tr>
                                                <td>是否主石</td>
                                                <td>Y</td>
                                                <td>数量</td>
                                                <td>1</td>
                                            </tr>
                                            <tr>
                                                <td>重量</td>
                                                <td>0.017CT</td>
                                                <td>钻石价值</td>
                                                <td>70.55HKD</td>
                                            </tr>
                                           
                                    </tbody>
                                </x-table>
                                </td>
                                </tr>
                                </tbody>
                                </x-table>
                            </div>
                        </div>
                    </card>
                </div>


            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import apiUrl from '@/service-api-config.js';
    import { getLangCodeByKey } from '@/comm-func.js';
    import {
        XInput, XButton, Box, Toast, Loading, TransferDom, Card, XTable
    } from 'vux';

    export default {
        data() {
            return {
                userCode: '',
                locationCode: '',
                position: 'default',
                showToast: false,
                tostShowTime: 1000,
                tostMsg: '',
                tostWidth: '12em',
                showLoading: false,
                loadingTxt: '',
                showMoreActSheet: false,
                temp: '待报价',
            }
        },
        created: function () {
            var loginInfo = JSON.parse(sessionStorage.getItem('loginInfo'));
            if (!loginInfo) {
                this.reLogin();
            } else {
                this.userCode = loginInfo.userCode;
                this.locationCode = loginInfo.loginLocation;

            }
        },
        components: {
            XInput,
            XButton,
            Box,
            Toast,
            Loading,
            Card,
            XTable
        },
        directives: {
            TransferDom
        },
        methods: {
            headerMoreBtnClick() {
                this.showMoreActSheet = true;

            },
            reLogin() {
                //
                sessionStorage.removeItem('loginInfo');
                //
                this.$router.push({
                    path: '/login2'
                });
            },
        },
    }
</script>
<style>
    .quote-container {
        box-sizing: border-box;
        padding-top: 46px;
        height: 100%;
        width: 100%;
        overflow-x: hidden;
        overflow-y: hidden;
        background-color: #F3F3F3;
    }

    .quote-body {
        height: 100%;
        /* background: cadetblue; */
        overflow-x: hidden;

    }

    .quote-body-content {
        /* padding: 20px 0px; */
    }

    .card-padding {
        padding: 15px;
    }

    .shortInfo {
        float: left;
        margin-right: 5px;
        width: 140px;
    }

    .shortInfoName {
        display: inline-block;
        width: 60px;
        padding-right: 5px;
        line-height: 20px;
        text-align: right;
        background-color: #ccc;
    }

    .shortDesc {
        clear: both;
    }

    .aaa {

        margin: 15px
    }
</style>