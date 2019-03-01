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
                <div class="quote-body-content-item">
                    <card :header="{title:$t('alterQuoteListLangs.CardHeader')+'QTHK021-2019-000125'}" 
                          :footer="{title: $t('alterQuoteListLangs.CardFooter'),link:''}">                      
                        <div slot="content" class="card-padding">                            
                            <div>
                                <x-table full-bordered style="background-color:#fff;">
                                    <thead>
                                        <tr>
                                            <th colspan="4" >
                                                <p class="quote-body-content-itemTitle leaveleftborder">{{$t('alterQuoteListLangs.BaseInfo')}}</p>
                                            </th>                                           
                                        </tr>
                                    </thead>
                                    <tbody>                                       
                                        <tr>
                                            <td>{{$t('alterQuoteListLangs.Location')}}</td>
                                            <td>HK021</td>
                                            <td>{{$t('alterQuoteListLangs.SalesMan')}}</td>
                                            <td>HK05118</td>
                                        </tr>
                                        <tr>
                                            <td>{{$t('alterQuoteListLangs.SKU')}}</td>
                                            <td>11111021</td>
                                            <td>{{$t('alterQuoteListLangs.MountNo')}}</td>
                                            <td>C06113E</td>
                                        </tr>
                                        <tr>
                                            <td>{{$t('alterQuoteListLangs.Vip')}}</td>
                                            <td colspan="3">tester</td>                                            
                                        </tr>                                       
                                        <tr>
                                            <td colspan="4"> <p class="quote-body-content-itemTitle leaveleftborder">{{$t('alterQuoteListLangs.SkuDescription')}}</p></td>
                                        </tr>
                                        <tr>
                                            <td colspan="4">
                                                <p style="line-height:1.6; " > 18K/750 白色黄金 钻石镶嵌 颈链金重:24.50克 英寸:18 1粒 梨形 钻石总重量:1.11卡 色泽:G 净度:VS1 4粒 圆形
                                                    钻石 总重量:0.39卡 证书:(G.I.A.:1229909190 ) 201粒 圆形钻石总重量:7.21卡</p>                                               
                                            </td>
                                        </tr> 
                                        <tr>
                                            <td colspan="4"> <p class="quote-body-content-itemTitle leaveleftborder">{{$t('alterQuoteListLangs.Cost')}}(HKD)</p></td>
                                        </tr>
                                        <tr>
                                            <td>{{$t('alterQuoteListLangs.LaborCost')}}</td>
                                            <td>2,034.50</td>
                                            <td>{{$t('alterQuoteListLangs.MaterialCost')}}</td>
                                            <td>6,800.52</td>
                                        </tr> 
                                        <tr>
                                            <td>{{$t('alterQuoteListLangs.StoneCost')}}</td>
                                            <td>79,250.40</td>
                                            <td>{{$t('alterQuoteListLangs.TotalCost')}}</td>
                                            <td>88,085.42</td>
                                        </tr>                                     
                                        <tr>
                                            <td colspan="4">
                                                <div >
                                                    <x-table full-bordered style="background-color:#fff; margin-top:-1px">
                                                        <thead>
                                                            <tr>
                                                                <th colspan="4"><Group style="padding:0 1px" gutter='0px' >
                                                                        <cell style="text-align:left" class="quote-body-content-itemTitle ":title="$t('alterQuoteListLangs.StoneInfo')" is-link :border-intent="false"
                                                                            :arrow-direction="showStoneDetail ? 'down' : 'left'"
                                                                            @click.native="showStoneDetail = !showStoneDetail">
                                                                        </cell>
                                                                    </Group>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody v-if="showStoneDetail">
                                                            <tr>
                                                                <td colspan="4"><p class="quote-body-content-itemSecndTitle leaveleftborder">钻石明细[1]</p></td>
                                                            </tr>
                                                            <tr>
                                                                    <td>Lot</td>
                                                                    <td>NA6810-A</td>
                                                                    <td>大小</td>
                                                                    <td>AA0003825</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>主石</td>
                                                                    <td>Y</td>
                                                                    <td>数量</td>
                                                                    <td>1</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>重量</td>
                                                                    <td>0.017CT</td>
                                                                    <td>价值</td>
                                                                    <td>70.55HKD</td>
                                                                </tr>
                                                            <tr>
                                                                <td colspan="4"><p class="quote-body-content-itemSecndTitle leaveleftborder">钻石明细[2]</p></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Lot</td>
                                                                <td>NA6810-A</td>
                                                                <td>大小</td>
                                                                <td>AA0003825</td>
                                                            </tr>
                                                            <tr>
                                                                <td>主石</td>
                                                                <td>Y</td>
                                                                <td>数量</td>
                                                                <td>1</td>
                                                            </tr>
                                                            <tr>
                                                                <td>重量</td>
                                                                <td>0.017CT</td>
                                                                <td>价值</td>
                                                                <td>70.55HKD</td>
                                                            </tr>
                                                        </tbody>
                                                    </x-table>
                                                </div>
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
        XInput, XButton, Box, Toast, Loading, TransferDom, Card, XTable, Group, CellBox, Cell
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
                showStoneDetail: false,
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
            XTable,
            Group,
            CellBox,
            Cell,

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

    .quote-body-content-item {
        margin: 10px;
    }
    .quote-body-content-itemTitle{
        background:#FAFAFA;
       
    }
    .leaveborder {
        margin: 1px;
    }
    .leaveleftborder {
        margin-left: 1px;
    }
    .quote-body-content-itemSecndTitle{
        background:#FCFCFC;
       
    }
    
</style>