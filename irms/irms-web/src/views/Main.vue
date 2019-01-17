<template>

    <div class="mainui-container">
        <box gap="0px 0px" style="height:100%">
            <x-header :left-options="{showBack: false}" :right-options="{showMore: true}" title="slot:overwrite-title"
                @on-click-more="headerMoreBtnClick" style="width: 100%; position: absolute; left: 0px; top: 0px; z-index: 100;">
                <div slot="overwrite-left" style="color:#ccc;font-size: 12px; position:relative; top: 12px; left:-15px;">
                    <x-icon type="person" size="15" style="fill:#fff;"></x-icon><span style="position:relative; top: 1px; margin-right: 10px;">{{userCode}}</span>
                    <x-icon type="home" size="15" style="fill:#fff;"></x-icon><span style="position:relative; top: 1px; margin-right: 10px;">{{locationCode}}</span>
                </div>
                <div>iRMS</div>
                <!-- <x-icon slot="right" type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;"></x-icon> -->
            </x-header>
            <div class="mainui-body">
                <div class="mainui-content">
                    <group title="销售运营" label-width="5.5em" label-margin-right="2em" label-align="justify" >
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
                    <divider class="bottom-diviver">底线</divider>
                </div>
            </div>
        </box>
    </div>
</template>

<script>
    import {
        Grid, GridItem, Divider, Box
    } from 'vux';
    export default {
        name: 'Main',
        components: {
            Grid,
            GridItem,
            Divider,
            Box
        },
        data() {
            return {
                userCode: 'Admin',
                locationCode: 'HK992',
            }
        },
        methods: {
            headerMoreBtnClick() {

            },
            onItemClick() {
                console.log('onItemClick')
            }
        }
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
</style>