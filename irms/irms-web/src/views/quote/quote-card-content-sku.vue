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
                                @click.native="showDetailInfoForQuote = !showDetailInfoForQuote">
                            </cell>
                        </Group>
                    </th>
                </tr>
            </thead>
            <tbody v-if="showDetailInfoForQuote">                
                <tr>
                    <td colspan="4">
                        <p class="quote-body-content-itemSecndTitle showleftborder">
                            {{$t('alterQuoteListLangs.SkuDescription')}}</p>
                    </td>
                </tr>
                <tr>
                    <td colspan="4">
                        <p style="line-height:1.6; ">18K/750 白色黄金 钻石镶嵌 颈链金重:24.50克 英寸:18 1粒 梨形 钻石总重量:1.11卡 色泽:G 净度:VS1
                            4粒 圆形
                            钻石 总重量:0.39卡 证书:(G.I.A.:1229909190 ) 201粒 圆形钻石总重量:7.21卡</p>
                    </td>
                </tr>
                <tr>
                    <td colspan="4">
                        <p class="quote-body-content-itemSecndTitle showleftborder">{{$t('alterQuoteListLangs.Cost')}}[HKD]
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
                        <QuoteCardContentStone></QuoteCardContentStone>
                    </td>
                </tr>
            </tbody>
        </x-table>
    </div>
</template>

<script>
    import { getLangCodeByKey } from '@/comm-func.js';
    import {
        XTable,Group, CellBox, Cell
    } from 'vux';
    import QuoteCardContentStone from '@/views/quote/quote-card-content-stone.vue';

    export default {
        props: ['skuOrMount'],
        data() {
            return {
                showDetailInfoForQuote: false,
                stoneInfos: [{ ID: 1, Lot: 'NA6810-A', StoneSizeCode: 'AA0003825', MainStone: 'Y', Qty: '1', Weight: '0.017CT', Cost: '70.55HKD' },
                { ID: 2, Lot: 'NA6810-B', StoneSizeCode: 'AA0003825', MainStone: 'Y', Qty: '2', Weight: '0.034CT', Cost: '140.55HKD' },
                { ID: 3, Lot: 'NA6810-C', StoneSizeCode: 'AA0003825', MainStone: 'Y', Qty: '1', Weight: '0.017CT', Cost: '70.55HKD' }],
            }
        },
        components: {
            XTable,
            Group,
            CellBox,
            Cell,
            QuoteCardContentStone,
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