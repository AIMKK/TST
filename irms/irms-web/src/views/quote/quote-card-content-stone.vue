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
                <template v-for="stoneInfo in stoneInfos">
                    <tr>
                        <td colspan="4">
                            <p class="quote-body-content-itemSecndTitle showleftborder">
                                {{$t('alterQuoteListLangs.StoneDetail')+"["+stoneInfo.ID+"]"}}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>{{$t('alterQuoteListLangs.Lot')}}</td>
                        <td>{{stoneInfo.Lot}}</td>
                        <td>{{$t('alterQuoteListLangs.StoneSizeCode')}}</td>
                        <td>{{stoneInfo.StoneSizeCode}}</td>
                    </tr>
                    <tr>
                        <td>{{$t('alterQuoteListLangs.MainStone')}}</td>
                        <td>{{stoneInfo.MainStone}}</td>
                        <td>{{$t('alterQuoteListLangs.Qty')}}</td>
                        <td>{{stoneInfo.Qty}}</td>
                    </tr>
                    <tr>
                        <td>{{$t('alterQuoteListLangs.Weight')}}</td>
                        <td>{{stoneInfo.Weight}}</td>
                        <td>{{$t('alterQuoteListLangs.Cost')}}</td>
                        <td>{{stoneInfo.Cost}}</td>
                    </tr>
                </template>
            </tbody>
        </x-table>
    </div>
</template>

<script>
    import { getLangCodeByKey } from '@/comm-func.js';
    import {
        XTable, Group, CellBox, Cell
    } from 'vux';

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