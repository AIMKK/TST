<template>
    <div>
        <x-table full-bordered style="background-color:#fff; margin-top:-1px">
            <thead>
                <tr>
                    <th colspan="4">
                        <Group style="padding:0 1px" gutter='0px'>
                            <cell style="text-align:left" class="quote-body-content-itemTitle "
                                :title="$t('alterQuoteListLangs.MoreInfo')" is-link :border-intent="false"
                                :arrow-direction="showDetailInfoForQuote ? 'down' : 'left'"
                                @click.native="switchShowDetailInfoForQuote">
                            </cell>
                        </Group>
                    </th>
                </tr>
            </thead>
            <tbody v-if="showDetailInfoForQuote">
                <template v-if="skuDetailInfo">
                    <tr>
                        <td colspan="4">
                            <p class="quote-body-content-itemSecndTitle showleftborder">
                                {{$t('alterQuoteListLangs.SkuDescription')}}</p>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <p style="line-height:1.6; ">{{skuDetailInfo.ChineseDescription}}</p>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <p class="quote-body-content-itemSecndTitle showleftborder">
                                {{$t('alterQuoteListLangs.Cost')+" ["+skuDetailInfo.Costcurrencycode+"]"}}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>{{$t('alterQuoteListLangs.LaborCost')}}</td>
                        <td>{{skuDetailInfo.LaborCost , "",2 | formatMoney}}</td>
                        <td>{{$t('alterQuoteListLangs.MaterialCost')}}</td>
                        <td>{{skuDetailInfo.MatieralCost , "",2 | formatMoney}}</td>
                    </tr>
                    <tr>
                        <td>{{$t('alterQuoteListLangs.StoneCost')}}</td>
                        <td>{{skuDetailInfo.StoneCost , "",2 | formatMoney}}</td>
                        <td>{{$t('alterQuoteListLangs.TotalCost')}}</td>
                        <td>{{skuDetailInfo.UnitCost , "",2 | formatMoney}}</td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <QuoteCardContentStone :stoneInfos="stoneInfos" :CurrencyCode="skuDetailInfo.Costcurrencycode"></QuoteCardContentStone>
                        </td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                        <td colspan="4">
                            <LoadMore :tip="$t('commLangs.LoadingMore')"></LoadMore>
                        </td>
                    </tr>
                </template>
            </tbody>
        </x-table>
    </div>
</template>

<script>
    import axios from 'axios';
    import apiUrl from '@/service-api-config.js';
    import { getLangCodeByKey } from '@/comm-func.js';
    import {
        XTable, Group, CellBox, Cell, LoadMore
    } from 'vux';
    import QuoteCardContentStone from '@/views/quote/quote-card-content-stone.vue';
    import accounting from 'accounting';
    //
    export default {
        props: ['skuOrMount'],
        data() {
            return {
                showDetailInfoForQuote: false,
                detailInfoForQuote: null,
                skuDetailInfo:null,
                stoneInfos:null,
            }
        },
        components: {
            XTable,
            Group,
            CellBox,
            Cell,
            LoadMore,
            QuoteCardContentStone,
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
            switchShowDetailInfoForQuote() {
                this.showDetailInfoForQuote = !this.showDetailInfoForQuote;
                if(this.showDetailInfoForQuote){
                    this.skuDetailInfo=null;
                    this.stoneInfos=null;
                    //loaddata
                    axios({
                        url: apiUrl.getProductInfoForQuote,
                        method: 'post',
                        data: {
                            skuno: this.skuOrMount
                        }
                    }).then((response) => {                        
                        console.log(response.data.message);
                        if (response.data.code == 200 && response.data.message) {
                            if (response.data.message.length > 1) {
                                var tempValue=response.data.message[0];
                                if(tempValue&&tempValue.length>0){
                                    this.skuDetailInfo=tempValue[0];
                                }else{
                                    this.skuDetailInfo={};                                
                                }
                                //
                                this.stoneInfos=response.data.message[1];
                            }
                        } else {
                            this.skuDetailInfo={};
                            this.stoneInfos=[];                           
                        }

                    }).catch((error) => {
                               
                    });
                }
            },
        },
    }
</script>

<style scoped>
    .quote-body-content-itemTitle {
        background: #FAFAFA;
    }

    .showborder {
        margin: 1px;
    }

    .showleftborder {
        margin-left: 1px;
    }

    .quote-body-content-itemSecndTitle {
        background: #FCFCFC;

    }
</style>