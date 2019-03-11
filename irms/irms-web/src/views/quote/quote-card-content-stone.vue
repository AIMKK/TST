<template>
    <div>
        <x-table full-bordered style="background-color:#fff; margin-top:-1px">
            <thead>
                <tr>
                    <th colspan="4">
                        <Group style="padding:0 1px" gutter='0px'>
                            <cell style="text-align:left" class="quote-body-content-itemTitle "
                                :title="$t('alterQuoteListLangs.StoneInfo')" is-link :border-intent="false"
                                :arrow-direction="showStoneDetail ? 'down' : 'left'"
                                @click.native="showStoneDetail = !showStoneDetail">
                            </cell>
                        </Group>
                    </th>
                </tr>
            </thead>
            <tbody v-if="showStoneDetail">
                <template v-for="(stoneInfo,index) in stoneInfos">
                    <tr>
                        <td colspan="4">
                            <p class="quote-body-content-itemSecndTitle showleftborder">
                                {{$t('alterQuoteListLangs.StoneDetail')+" ["+(index+1)+"]"}}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>{{$t('alterQuoteListLangs.Lot')}}</td>
                        <td>{{stoneInfo.Lot}}</td>
                        <td>{{$t('alterQuoteListLangs.StoneSizeCode')}}</td>
                        <td>{{stoneInfo.Size}}</td>
                    </tr>
                    <tr>
                        <td>{{$t('alterQuoteListLangs.MainStone')}}</td>
                        <td>{{stoneInfo.MainStone | formatMainStone}}</td>
                        <td>{{$t('alterQuoteListLangs.Qty')}}</td>
                        <td>{{stoneInfo.TotalQty}}</td>
                    </tr>
                    <tr>
                        <td>{{$t('alterQuoteListLangs.Weight')}}</td>
                        <td>{{stoneInfo.totalWeight,3 |formatNumber}} CT</td>
                        <td>{{$t('alterQuoteListLangs.Cost')}}</td>
                        <td>{{ stoneInfo.TotalCost, "",2 | formatMoney }} {{CurrencyCode}}</td>
                    </tr>
                </template>
            </tbody>
        </x-table>
    </div>
</template>

<script>
    import accounting from 'accounting';
    import { getLangCodeByKey } from '@/comm-func.js';
    import {
        XTable, Group, CellBox, Cell
    } from 'vux';

    export default {
        props: ['stoneInfos','CurrencyCode'],
        data() {
            return {
                showStoneDetail: false,
               
            }
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
        components: {
            XTable,
            Group,
            CellBox,
            Cell,
        },
    }
</script>

<style scoped>
    .quote-body-content-itemTitle {
        background: #FAFAFA;

    }

    .showleftborder {
        margin-left: 1px;
    }

    .quote-body-content-itemSecndTitle {
        background: #FCFCFC;

    }
</style>