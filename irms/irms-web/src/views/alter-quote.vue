<template>
    <div class="quote-container">
        <x-header :left-options="{showBack: true}" :right-options="{showMore: true}" style="width: 100%; position: absolute; left: 0px; top: 0px; z-index: 100;"
            @on-click-more="headerMoreBtnClick">
            <div>iRMS</div>
        </x-header>
        <div class="quote-body">
            <div class="quote-body-content">
                sdfsdf-- quote
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
    import apiUrl from '@/service-api-config.js';
    import {getLangCodeByKey} from '@/comm-func.js';
    import {
        XInput, XButton, Box, Toast, Loading, TransferDom
    } from 'vux';
   
    export default {
        data() {
            return {               
                position: 'default',
                showToast: false,
                tostShowTime: 1000,
                tostMsg: '',
                tostWidth: '12em',
                showLoading: false,
                loadingTxt: '',
                showMoreActSheet: false,
            }
        },
        components: {
            XInput,
            XButton,
            Box,
            Toast,
            Loading,
        },
        directives: {
            TransferDom
        },
        methods: {
            headerMoreBtnClick() {
                this.showMoreActSheet = true;

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
    }

    .quote-body {
        height: 100%;
        /* background: cadetblue; */
        overflow-x: hidden;

    }

    .quote-body-content {
        padding: 20px 0px;
    }
</style>