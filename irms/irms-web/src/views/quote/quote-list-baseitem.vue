<template>
        <div>
            <x-table full-bordered style="background-color:#fff;">
                <thead>
                    <tr>
                        <th colspan="4">
                            <p class="quote-body-content-itemTitle showleftborder">{{$t('alterQuoteListLangs.InfoForQuote')}}
                            </p>
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
                        <td colspan="4">
                            <QuoteListItemDtl></QuoteListItemDtl>
                        </td>
                    </tr>
                    <!-- <tr>
                        <td colspan="4">
                            <p style="line-height:1.6; ">18K/750 白色黄金 钻石镶嵌 颈链金重:24.50克 英寸:18 1粒 梨形 钻石总重量:1.11卡 色泽:G 净度:VS1
                                4粒 圆形
                                钻石 总重量:0.39卡 证书:(G.I.A.:1229909190 ) 201粒 圆形钻石总重量:7.21卡</p>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <p class="quote-body-content-itemTitle showleftborder">{{$t('alterQuoteListLangs.Cost')}}[HKD]
                            </p>
                        </td>
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
                            <QuoteListItemDtlStone></QuoteListItemDtlStone>
                        </td>
                    </tr> -->
                </tbody>
            </x-table>
        </div>
    </template>
    
    <script>
        import { getLangCodeByKey } from '@/comm-func.js';
        import {
            XTable
        } from 'vux';
        // import QuoteListItemDtlStone from '@/views/quote/quote-list-itemdtl-stone.vue';
        import QuoteListItemDtl from '@/views/quote/quote-list-itemdtl.vue';
        export default {
            data() {
                return {
                    showStoneDetail: false,
                    stoneInfos: [{ ID: 1, Lot: 'NA6810-A', StoneSizeCode: 'AA0003825', MainStone: 'Y', Qty: '1', Weight: '0.017CT', Cost: '70.55HKD' },
                    { ID: 2, Lot: 'NA6810-B', StoneSizeCode: 'AA0003825', MainStone: 'Y', Qty: '2', Weight: '0.034CT', Cost: '140.55HKD' },
                    { ID: 3, Lot: 'NA6810-C', StoneSizeCode: 'AA0003825', MainStone: 'Y', Qty: '1', Weight: '0.017CT', Cost: '70.55HKD' }],
    
                }
            },
            components: {
                XTable,
                // QuoteListItemDtlStone,
                QuoteListItemDtl,
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
    </style>