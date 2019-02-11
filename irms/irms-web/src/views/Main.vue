<template>

    <div class="mainui-container">
        <div style="width: 100%; position: absolute; left: 0px; top: 0px; z-index: 100;">
            <x-header :left-options="{showBack: false}" :right-options="{showMore: true}" title="slot:overwrite-title"
                @on-click-more="headerMoreBtnClick">
                <div slot="overwrite-left">
                    <svg style="width:20px;height:22px;fill: #ccc;" aria-hidden="true">
                        <use xlink:href="#icon-tuichu"></use>
                    </svg><span style="position:relative; top: -6px; margin-right: 10px;">{{$t('mainLangs.Exit')}}</span>
                </div>
                <div>iRMS</div>
                <!-- <x-icon slot="right" type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;"></x-icon> -->
            </x-header>
            <!-- <div slot="overwrite-left" style="color:#ccc;font-size: 12px; position:relative; top: 12px; left:-15px;">
                <svg style="width:14px;height:14px;fill: #fff;" aria-hidden="true">
                    <use xlink:href="#icon-user"></use>
                </svg><span style="position:relative; top: -1px; margin-right: 10px;">{{userCode}}</span>
                <svg style="width: 14px;height:14px;fill: #fff;" aria-hidden="true">
                    <use xlink:href="#icon-shouye"></use>
                </svg><span style="position:relative; top: -1px; margin-right: 10px;">{{locationCode}}</span>
            </div> -->
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

        <div class="mainui-body">
            <div class="mainui-content">
                <div class="menu-group" v-if="menuRoot.Children">
                    <group :title="menu.Description" v-for="menu in menuRoot.Children" :key="menu.FunctionID">
                        <grid :cols="4">
                            <grid-item :label="secondMenu.Description" v-for="secondMenu in menu.Children"
                                :key="secondMenu.FunctionID" :link="{ path: secondMenu.RouterLink}"
                                @on-item-click="onItemClick">
                                <div slot="icon" class="divTxtCenter">
                                    <!-- <badge text="8" style="position:absolute; top:5px;right:5px;"></badge> -->
                                    <svg class="iconsvg" aria-hidden="true">
                                        <use :xlink:href="'#'+secondMenu.Icon"></use>
                                    </svg>
                                </div>
                            </grid-item>
                        </grid>
                    </group>
                </div>
                <!-- <divider class="bottom-diviver">{{$t('mainLangs.BottomLine')}}</divider> -->
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
        Grid, GridItem, Divider, XButton, Badge
    } from 'vux';
    export default {
        name: 'Main',
        components: {
            Grid,
            GridItem,
            Divider,
            XButton,
            Badge
        },
        data() {
            return {
                userCode: '',
                locationCode: '',
                showMoreActSheet: false,
                menuRoot: {},
                // path:'/alterQuote',
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
                        //
                        var rootNode = this.organizeFunction(response.data.message);
                        this.paddingSecondLevlMenuPlaceHold(rootNode, 4);
                        this.menuRoot = rootNode;

                    } else {
                        console.log('hererere')
                    }
                }).catch((error) => {
                    console.log(error)

                });
            },
            /*
                createFunctionNode
            */
            createFunctionNode(functionID, desc, icon, routerLink, SortOrder) {
                return {
                    FunctionID: functionID,
                    Description: desc,
                    Icon: icon,
                    RouterLink: routerLink,
                    Children: [],
                    SortOrder: SortOrder,
                }
            },
            /*
                organizeFunction
            */
            organizeFunction(functionArr) {
                if (!functionArr) {
                    return;
                }
                //是否是数组，
                if (Object.prototype.toString.call(functionArr) !== '[object Array]') {
                    return;
                }
                //
                var rootFuncNode = this.createFunctionNode();
                if (!rootFuncNode) {
                    return;
                }
                //
                var tempFunc;
                var tempParentFunc;
                var tempNode;
                var tempParentNode;

                if (functionArr.length == 0) {
                    return rootFuncNode;
                }
                //
                for (let index = 0; index < functionArr.length; index++) {
                    tempFunc = functionArr[index];
                    if (!tempFunc.ParentID) {//说明是第一层的
                        tempNode = this.createFunctionNode(tempFunc.FunctionID, tempFunc.Description, tempFunc.Icon, tempFunc.RouterLink, tempFunc.SortOrder);
                        rootFuncNode.Children = rootFuncNode.Children || [];
                        rootFuncNode.Children.push(tempNode);//
                        //
                        functionArr.splice(index, 1)//从原来数据中删除掉
                        index--;//因为数组元素减少了值
                        continue;
                        //break;
                    } else {//说明是其他层的
                        tempParentFunc = this.findFuncByID(functionArr, tempFunc.ParentID);
                        if (tempParentFunc) {
                            continue;//先留着等待后面加入到children
                        } else {//如果不存在功能列表中
                            tempParentNode = this.findMenuNodeByID(rootFuncNode, tempFunc.ParentID);
                            //如果存在menuNode中就加入
                            if (tempParentNode) {
                                tempNode = this.createFunctionNode(tempFunc.FunctionID, tempFunc.Description, tempFunc.Icon, tempFunc.RouterLink, tempFunc.SortOrder);
                                //
                                tempParentNode.Children = tempParentNode.Children || [];
                                //
                                tempParentNode.Children.push(tempNode);//加入到child里面
                            }
                            //
                            functionArr.splice(index, 1)//从原来数据中删除掉
                            index--;//因为数组元素减少了值
                            continue;
                        }
                    }
                }

                //
                return rootFuncNode;

            },
            /*
                paddingSecondLevlMenuPlaceHold
            */
            paddingSecondLevlMenuPlaceHold(rootFuncNode, menuLeastNum) {
                if (!rootFuncNode || !rootFuncNode.Children) {
                    return;
                }
                if (menuLeastNum < 0) {
                    menuLeastNum = 0;
                }
                //
                var firstLevlChilds = rootFuncNode.Children || [];
                var firstLevllen = firstLevlChilds.length;
                var secndLevelMenu;
                var tempLen;
                var tempNode;
                for (let index = 0; index < firstLevllen; index++) {
                    secndLevelMenu = firstLevlChilds[index];
                    tempLen = secndLevelMenu.Children.length || 0;
                    if (tempLen < menuLeastNum) {
                        for (let j = 0; j < menuLeastNum - tempLen; j++) {
                            tempNode = this.createFunctionNode(secndLevelMenu.FunctionID + 'padding' + j, this.$t("mainLangs.ComingSoon"), 'icon-jingqingqidai', '', tempLen + j);
                            //
                            secndLevelMenu.Children.push(tempNode)
                        }
                    }
                }
            },
            /*
                findFuncByID
            */
            findFuncByID(functionArr, ID) {
                if (!functionArr) {
                    return;
                }
                //是否是数组，
                if (Object.prototype.toString.call(functionArr) !== '[object Array]') {
                    return;
                }
                var tempFunc;
                //
                for (var index = 0; index < functionArr.length; index++) {
                    tempFunc = functionArr[index];
                    if (tempFunc.FunctionID == ID) {
                        break;
                    } else {
                        tempFunc = null;
                    }
                }
                //
                return tempFunc;
            },
            /*
                findMenuNodeByID
            */
            findMenuNodeByID(rootFuncNode, ID) {
                if (!rootFuncNode) {
                    return;
                }
                //
                var nodeArr = [];
                nodeArr = this.unshiftMergeArr(rootFuncNode.Children, nodeArr);

                //
                var tempNode;
                while (nodeArr.length > 0) {
                    tempNode = nodeArr.shift() || {};//nodeArr.splice(0, 1);//从头开始进行判断  or shift//splice return arr
                    //
                    if (tempNode.FunctionID == ID) {
                        break;
                    } else {
                        nodeArr = this.unshiftMergeArr(tempNode.Children, nodeArr);//当前节点的子节点
                        tempNode = null;
                    }
                }
                //
                return tempNode;
            },
            /*
                unshiftMergeArr
                insert to head
            */
            unshiftMergeArr(fromArr, toArr) {
                if (!fromArr) {
                    return toArr;
                }
                //
                if (!toArr) {
                    return [].concat(fromArr);
                }
                //
                for (let index = 0; index < fromArr.length; index++) {
                    toArr.unshift(fromArr[index]);
                }
                //
                return toArr;
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
        background-color: #fff;
    }

    .mainui-body {
        height: 100%;
        overflow-x: hidden;
    }

    /* .mainui-content {

    } */

    .menu-group {
        padding-bottom: 5px;
    }

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
    }

    .divTxtCenter {
        text-align: center;
    }
</style>