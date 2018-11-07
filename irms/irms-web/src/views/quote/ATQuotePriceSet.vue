<template>
    <b-container id="main">
        <b-card no-body header="<b>修理报价</b>">
            <b-card-body>
                <b-row class="my-1">
                    <b-col sm="6">
                        <label for="sku">SKU:</label>
                        <b-form-input id="sku" type="text" v-model="Skuno" aria-describedby="inputFormatterHelp"
                            :formatter="format" disabled="true" ></b-form-input>
                        <!-- <label>Sku:</label>
                        <div><label>{{Skuno}}</label></div> -->
                    </b-col>
                    <b-col sm="6">
                        <div><label>MountNo:{{MountNo}}</label></div>
                    </b-col>
                </b-row>
                <div>
                    <label>Description:{{ChineseDescription}}</label>
                </div>
                <b-row class="my-1">
                    <b-col sm="3">
                        <div><label>LaborCost:{{LaborCost}}</label></div>
                    </b-col>
                    <b-col sm="3">
                        <div><label>MatieralCost:{{MatieralCost}}</label></div>
                    </b-col>
                    <b-col sm="3">
                        <div><label>StoneCost:{{StoneCost}}</label></div>
                    </b-col>
                    <b-col sm="3">
                        <div><label>UnitCost:{{UnitCost}}</label></div>
                    </b-col>
                </b-row>
            </b-card-body>
            <b-list-group flush>
                <b-list-group-item class="flex-column align-items-start" v-for="(stone,index) in StoneInfo" :key="index">
                    <h5>Stone Info</h5>
                    <b-row class="my-1">
                        <b-col sm="4">
                            <div><label>Lot:{{stone.Lot}}</label></div>
                        </b-col>
                        <b-col sm="4">
                            <div><label>StoneSize:{{stone.Size}}</label></div>
                        </b-col>
                        <b-col sm="4">
                            <div><label>MainStone:{{stone.MainStone}}</label></div>
                        </b-col>
                        <b-col sm="4">
                            <div><label>StoneQty:{{stone.TotalQty}}</label></div>
                        </b-col>
                        <b-col sm="4">
                            <div><label>StoneWeight:{{stone.totalWeight}}</label></div>
                        </b-col>
                        <b-col sm="4">
                            <div><label>StoneCost:{{stone.TotalCost}}</label></div>
                        </b-col>
                    </b-row>
                </b-list-group-item>
            </b-list-group>
            <b-card-body>
                <div role="group">
                    <label for="quotePrice"><b>QuotePrice:</b></label>
                    <b-form-input id="quotePrice" type="number"></b-form-input>
                </div>
                <hr>
                <b-row class="my-1">
                    <b-col cols="6">
                        <b-button variant="secondary" block>Exit</b-button>
                    </b-col>
                    <b-col cols="6">
                        <b-button variant="success" block>Save</b-button>
                    </b-col>
                </b-row>
            </b-card-body>
        </b-card>
    </b-container>
</template>
<script>
    import axios from 'axios';
    import apiUrl from '@/service-api-config.js';
    export default {
        data() {
            return {
                Skuno: '',
                MountNo: '',
                MountImage: '',
                ChineseDescription: '',
                Costcurrencycode: '',
                ConfirmedDate: '',
                LaborCost: '',
                MatieralCost: '',
                StoneCost: '',
                UnitCost: '',
                StoneInfo: [],
            }
        },
        created() {
            // if(!this.$store.state.loginUserCode){
            //     this.$router.push({path:'/login'});
            // }           

            var sku = this.$route.query.skuno;
            console.log(this.$route);
            //this.$route.query.goodsId?this.$route.query.goodsId:this.$route.params.goodsId;

            axios({
                url: apiUrl.quotePrice,
                method: 'post',
                data: {
                    skuno: '23895609'
                }
            }).then((response) => {
                console.log(response.data.code);
                console.log('response.data.message');
                console.log(response.data.message);
                if (response.data.code == 200 && response.data.message) {
                    if (response.data.message.length > 1) {
                        //console.log(response);
                        var mainInfo = response.data.message[0][0];
                        // console.log(mainInfo);
                        this.Skuno = mainInfo.Skuno;
                        this.MountNo = mainInfo.MountNo;
                        this.StoneCost = mainInfo.StoneCost;
                        this.LaborCost = mainInfo.LaborCost;
                        this.MountImage = mainInfo.MountImage;
                        this.UnitCost = mainInfo.UnitCost;
                        this.Costcurrencycode = mainInfo.Costcurrencycode;
                        this.ChineseDescription = mainInfo.ChineseDescription;
                        this.MatieralCost = mainInfo.MatieralCost;
                        //
                        this.StoneInfo = response.data.message[1];
                        // console.log(this.StoneInfo);
                    }
                } else {
                    console.log(response);
                }

            }).catch((error) => {
                this.Skuno = error
                console.log(error);

            });
        },
        methods: {

        },
    }
</script>
<style scoped>
    .header {
        text-align: center;
        padding-bottom: 10px;
    }

    #main {
        padding: 5px;
    }
</style>