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
                        <td>{{content.LocationCode}}</td>
                        <td>{{$t('alterQuoteListLangs.SalesMan')}}</td>
                        <td>{{content.SalesMan}}</td>
                    </tr>
                    <tr>
                        <td>{{$t('alterQuoteListLangs.SKU')}}</td>
                        <td>{{content.SKUNo}}</td>
                        <td>{{$t('alterQuoteListLangs.MountNo')}}</td>
                        <td>{{content.MountNo}}</td>
                    </tr>
                    <tr>
                        <td>{{$t('alterQuoteListLangs.Vip')}}</td>
                        <td colspan="3">{{content.VipCode}}</td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <QuoteCardContentSKU :skuOrMount="content.SKUNo||content.MountNo"></QuoteCardContentSKU>
                        </td>
                    </tr>                   
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
        import QuoteCardContentSKU from '@/views/quote/quote-card-content-sku.vue';
        export default {
            props: ['content'],
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
                QuoteCardContentSKU,
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