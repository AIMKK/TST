<template>

    <div class="mainui-container">

        <x-header :left-options="{showBack: false}" :right-options="{showMore: true}" title="slot:overwrite-title"
            @on-click-more="headerMoreBtnClick" style="width: 100%; position: absolute; left: 0px; top: 0px; z-index: 100;">
            <div slot="overwrite-left" style="color:#ccc;font-size: 12px; position:relative; top: 12px; left:-15px;">
                <!-- <x-icon type="person" size="15" style="fill:#fff;"></x-icon><span style="position:relative; top: -2px; margin-right: 10px;">{{userCode}}</span>
                <x-icon type="home" size="15" style="fill:#fff;"></x-icon><span style="position:relative; top: -2px; margin-right: 10px;">{{locationCode}}</span> -->
                <svg style="width:14px;height:14px;fill: #fff;" aria-hidden="true"> <use xlink:href="#icon-user"></use> </svg><span style="position:relative; top: -1px; margin-right: 10px;">{{userCode}}</span>                
                <svg style="width: 14px;height:14px;fill: #fff;" aria-hidden="true"> <use xlink:href="#icon-shouye"></use> </svg><span style="position:relative; top: -1px; margin-right: 10px;">{{locationCode}}</span>
            </div>
            <div>iRMS</div>
            <!-- <x-icon slot="right" type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;"></x-icon> -->
        </x-header>
        <div class="mainui-body">
            <div class="mainui-content">
                <group title="销售运营" label-width="5.5em" label-margin-right="2em" label-align="justify">
                    <grid :cols="5">
                        <grid-item label="销售运营销售运营销售运营" v-for="i in 9" :link="{ path: '/component/cell'}"
                            @on-item-click="onItemClick">
                            <span class="grid-center"> aaa</span>
                        </grid-item>
                    </grid>
                </group>
                <group title="库存控制" label-width="5.5em" label-margin-right="2em" label-align="justify">
                    <grid :cols="5">
                        <grid-item label="库存" v-for="i in 11" :link="{ path: '/component/cell'}" @on-item-click="onItemClick">
                            <span class="grid-center"> aaa</span>
                        </grid-item>
                    </grid>
                </group>
                <group title="客户管理" label-width="5.5em" label-margin-right="2em" label-align="justify">
                    <grid :cols="5">
                        <grid-item label="客户" v-for="i in 8" :link="{ path: '/component/cell'}" @on-item-click="onItemClick">
                            <span class="grid-center"> aaa</span>
                        </grid-item>
                    </grid>
                </group>
                <group title="后勤事务" label-width="5.5em" label-margin-right="2em" label-align="justify">
                    <grid :cols="5">
                        <grid-item label="后勤" v-for="i in 15" :link="{ path: '/component/cell'}" @on-item-click="onItemClick">
                            <span class="grid-center"> aaa</span>
                        </grid-item>
                    </grid>
                </group>
                <group title="测试">
                    <grid>
                        <grid-item label="九宫格" v-for="i in 5">

                            <!-- <div slot="icon" class="iconfont divTxtCenter">&#xe64d;</div> -->
                            <div slot="icon" class="divTxtCenter">
                                <svg class="iconsvg" aria-hidden="true">
                                    <use xlink:href="#icon-user1"></use>
                                </svg>
                            </div>
                        </grid-item>
                    </grid>
                </group>
                <group title="测试2">
                    <grid>
                        <grid-item label="九宫格2" v-for="i in 5">
                            <div slot="icon" class="divTxtCenter">
                                <svg class="iconsvg" aria-hidden="true">
                                    <use xlink:href="#icon-YLTC_lipinshangjiao"></use>
                                </svg>
                            </div>
                        </grid-item>
                    </grid>
                </group>

                <divider class="bottom-diviver">我们的底线</divider>
            </div>
        </div>

        <action-sheet v-model="showMoreActSheet" :menus="moreMenus" @on-click-menu="actSheetMenuClick" theme="android">

        </action-sheet>
    </div>
</template>

<script>
    import axios from 'axios';
    import apiUrl from '@/service-api-config.js';
    import { getLangCodeByKey } from '@/comm-func.js';
    import {
        Grid, GridItem, Divider, XButton
    } from 'vux';
    export default {
        name: 'Main',
        components: {
            Grid,
            GridItem,
            Divider,
            XButton
        },
        data() {
            return {
                userCode: '',
                locationCode: '',
                showMoreActSheet: false,
            }
        },
        created: function () {
            var loginInfo = JSON.parse(sessionStorage.getItem('loginInfo'));
            if (!loginInfo) {
                this.reLogin();
            } else {
                this.userCode = loginInfo.userCode;
                this.locationCode = loginInfo.loginLocation;
                //
                this.getFunctions(loginInfo.userCode);
            }
        },
        methods: {
            headerMoreBtnClick() {
                this.showMoreActSheet = true;
            },
            actSheetMenuClick(key) {
                if ((key || '').toLowerCase() == 'logout') {
                    this.reLogin();
                }
                else {
                    this.$i18n.locale = getLangCodeByKey(key);
                }
            },

            onItemClick() {
                console.log('onItemClick')
            },
            reLogin() {
                //
                sessionStorage.removeItem('loginInfo');
                //
                this.$router.push({
                    path: '/login2'
                });
            },
            getFunctions(userID) {               
                axios({
                    url: apiUrl.getFunctionID,
                    method: 'post',
                    data: {
                        userCode: userID,
                    }
                }).then((response) => {
                    if (response.data.code == 200 && response.data.message) {
                        console.log(response.data.message)
                       
                    } else {
                        console.log('hererere')
                    }
                }).catch((error) => {
                    console.log(error)
                  
                });
            },
        },
        computed: {
            moreMenus: function () {
                return {
                    // chngLang: this.$t("moreBtnForCommLangs.ChngLang"),
                    CHS: this.$t("moreBtnForCommLangs.CHSLang"),
                    CHI: this.$t("moreBtnForCommLangs.CHILang"),
                    ENG: this.$t("moreBtnForCommLangs.ENGLang"),
                    LogOut: this.$t("moreBtnForCommLangs.LogOut"),
                }
            },
        },

    }
</script>
<style>
    .mainui-container {
        box-sizing: border-box;
        padding-top: 46px;
        height: 100%;
        width: 100%;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    .mainui-body {
        height: 100%;
        overflow-x: hidden;
    }

    .mainui-content {}

    .grid-center {
        display: block;
        text-align: center;
        color: #666;
    }

    .bottom-diviver {
        margin-top: 15px;
        font-size: 12px;
    }

    a {
        text-decoration: none;
        /* color: #000000; */
    }

    .divTxtCenter {
        text-align: center;
    }
</style>