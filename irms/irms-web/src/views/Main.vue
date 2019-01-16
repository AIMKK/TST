<template>
    <div class="mainui-container">
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
               
                <group title="销售运营" label-width="5.5em" label-margin-right="2em" label-align="justify">
                    <cell title="cell"></cell>
                </group>
                <group>
                    <group-title slot="title">I'm a title</group-title>
                    <cell title="cell"></cell>
                </group>
                <group title="justify" label-width="5.5em" label-margin-right="2em" label-align="justify">
                    <cell title="哈哈" value="value" is-link></cell>
                    <cell title="哈哈哈哈哈" value="value" is-link value-align="left"></cell>
                    <x-input title="上报人"></x-input>
                    <x-number title="Quantity" align="left" button-style="round" :min="0" :max="5"></x-number>

                    <x-address title="地址选择" raw-value :list="addressData" value-text-align="left" label-align="justify"></x-address>
                    <x-switch title="选择"></x-switch>
                    <x-textarea title="详细信息" placeholder="请填写详细信息" :show-counter="false" :rows="3"></x-textarea>
                </group>
                <group title="justify" label-width="5.5em" label-margin-right="2em" label-align="justify">
                    <cell title="哈哈" value="value" is-link></cell>
                    <cell title="哈哈哈哈哈" value="value" is-link value-align="left"></cell>
                    <x-input title="上报人"></x-input>
                    <x-number title="Quantity" align="left" button-style="round" :min="0" :max="5"></x-number>

                    <x-address title="地址选择" raw-value :list="addressData" value-text-align="left" label-align="justify"></x-address>
                    <x-switch title="选择"></x-switch>
                    <x-textarea title="详细信息" placeholder="请填写详细信息" :show-counter="false" :rows="3"></x-textarea>
                </group>
            </div>

        </div>

    </div>
</template>

<script>
    import { Group, XInput, XNumber, XSwitch, XTextarea, XAddress, Cell } from 'vux';
    export default {
        name: 'Main',
        components: {
            Group,
            XInput,
            XNumber,
            XSwitch,
            XTextarea,
            XAddress,
            Cell,
        },
        data() {
            return {
                userCode: 'Admin',
                locationCode: 'HK992'
            }
        },
        methods: {
            headerMoreBtnClick() {

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
        /* background: #c0c; */
    }
    .mainui-content{

    }
</style>