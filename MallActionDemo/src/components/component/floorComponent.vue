<template>
<div class="floor">    
    <div class="floor-title">
        {{floorTitle}}
    </div>
        <div class="floor-anormal">
            <div class="floor-one">
                <img :src="floorData0.image" width="100%"/>
            </div>
            <div >
                <div class="floor-two">
                    <img :src="floorData1.image" width="100%"/>
                </div>
                <div >
                    <img :src="floorData2.image" width="100%"/>
                </div>            
            </div>
            </div>
         <div class="floor-normal">
                <div v-for="(item,index) in floorData.slice(3)" :key="index">
                    <img :src="item.image" width="100%"/>>
                </div>
        </div>           
    </div>   
      
</template>

<script>
    export default {
        props:['floorData','floorTitle'],
        data() {
            return {
                floorData0: {},
                floorData1: {},
                floorData2: {}
            }
        },
        created(){
            // this.floorData0=this.floorData[0];
            // this.floorData1=this.floorData[1];
            // this.floorData2=this.floorData[2];
        },
        watch:{
            floorData: function(val){
                console.log(this.floorData)
                this.floorData0=this.floorData[0];
                this.floorData1=this.floorData[1];
                this.floorData2=this.floorData[2];
            }
        }
    }
</script>

<style scoped>
.floor-title{
    text-align:center;
    font-size: 14px;
    height: 1.8rem;
    line-height: 1.8rem;
}
.floor-anormal{
    display: flex;
    flex-direction: row;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
}
.floor-anormal div{
   widows: 10rem;
   box-sizing: border-box;
   -moz-box-sizing: border-box;
}
.floor-one{
    border-right: 1px solid #ddd;
}
.floor-two{
    border-bottom: 1px solid #ddd;
}
.floor-normal{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #fff;
}
.floor-normal div{
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    width: 10rem;
    border-bottom: 1px solid #ddd;
}
.floor-normal div:nth-child(odd){
    border-right: 1px solid #ddd;
}
</style>