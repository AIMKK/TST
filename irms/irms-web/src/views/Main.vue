<template>
    <div>
        <x-header :left-options="{showBack: false}" :right-options="{showMore: true}" 
        title="slot:overwrite-title" @on-click-more="headerMoreBtnClick">            
            <div slot="overwrite-left" style="color:#ccc;font-size: 12px; position:relative; top: 12px; left:-15px;">
                <x-icon type="person" size="15"  style="fill:#fff;"></x-icon><span style="position:relative; top: 1px; margin-right: 10px;">{{userCode}}</span>                
                <x-icon type="home" size="15" style="fill:#fff;"></x-icon><span style="position:relative; top: 1px; margin-right: 10px;">{{locationCode}}</span>
            </div>
            <div>iRMS</div>
            <!-- <x-icon slot="right" type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;"></x-icon> -->
        </x-header>
    </div>
</template>

<script>
    export default {
        name:'Main',  
        data() {
            return {
                userCode: 'Admin',
                locationCode: 'HK992'
            }
        },  
        methods:{
            headerMoreBtnClick(){
                
            }
        }     
    }
</script>
<style>
  
</style>