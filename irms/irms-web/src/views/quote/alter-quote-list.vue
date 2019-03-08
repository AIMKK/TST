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
                <!-- <svg style="width: 14px;height:14px;fill: #fff;" aria-hidden="true">
                    <use xlink:href="#icon-shouye"></use>
                </svg><span style="position:relative; top: -1px; margin-right: 10px;">{{locationCode}}</span> -->
            </div>
        </div>
        <div class="quote-body">
            <div class="quote-body-content">
                <div class="quote-body-content-item">
                    <card :header="{title:$t('alterQuoteListLangs.CardHeader')+'XXXX-2019-XXXXXX'}"
                        :footer="{title: $t('alterQuoteListLangs.CardFooter')}" @on-click-footer="showQuote=true;">
                        <div slot="content" class="card-padding">
                            <QuoteListItem></QuoteListItem>
                        </div>
                    </card>
                </div>
            </div>
        </div>
        <div>
            <!-- hide-on-blur -->
            <x-dialog v-model="showQuote" @on-hide="onHide">
                <div style="padding:15px;">
                    <div style="margin-bottom:10px;">报价</div>
                    <div style="margin-bottom:20px;"><input type="number"
                            style=" width:100% ; padding: 2px 0px; border:#DEDEDE 1px solid ;height:28px; outline:none; font-size:16px;border-radius:4px;">
                    </div>

                    <x-button style="float:left; width:45%; margin-top:0px;margin-bottom: 15px;"
                        @click.native="CancelQuote" type="default">取消</x-button>
                    <x-button style="float:right; width:45%; margin-top:0px;margin-bottom: 15px;"
                        @click.native="saveQuote" type="primary" :show-loading="showLoading" :disabled="btnDisabled">确定
                    </x-button>

                </div>
            </x-dialog>
        </div>
        <toast v-model="showToast" type="text" :width="tostWidth" :time="tostShowTime" is-show-mask :text="tostMsg"
            :position="position">
        </toast>

    </div>
</template>
<script>
    import axios from 'axios';
    import apiUrl from '@/service-api-config.js';
    import { getLangCodeByKey } from '@/comm-func.js';
    import {
        XInput, XButton, Box, Toast, Loading, TransferDom, Card, XDialog, InlineLoading
    } from 'vux';

    import QuoteListItem from '@/views/quote/quote-list-item.vue';

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
                showQuote: false,
                btnDisabled: false,
                // stoneInfos:[{ID:1,Lot:'NA6810-A',StoneSizeCode:'AA0003825',MainStone:'Y',Qty:'1',Weight:'0.017CT',Cost:'70.55HKD'},
                // {ID:2,Lot:'NA6810-B',StoneSizeCode:'AA0003825',MainStone:'Y',Qty:'2',Weight:'0.034CT',Cost:'140.55HKD'},
                // {ID:3,Lot:'NA6810-C',StoneSizeCode:'AA0003825',MainStone:'Y',Qty:'1',Weight:'0.017CT',Cost:'70.55HKD'}],

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
            XDialog,
            InlineLoading,
            QuoteListItem,
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
            onShow() {

            },
            onHide() {
                this.showLoading = false;
            },
            CancelQuote() {
                this.showQuote = false;
            },
            saveQuote() {
                this.showLoading = true;

            },
            setToastInner(show, msg, width, showTime) {
                this.showToast = !!show;
                this.tostMsg = msg;
                if (width) {
                    this.tostWidth = width;
                }
                if (showTime) {
                    this.tostShowTime = showTime;
                }
            },
            setLoadingInner(show, txt) {
                this.showLoading = !!show;
                this.loadingTxt = txt;
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