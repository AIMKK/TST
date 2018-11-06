<template>
    <b-container id="main">
        <b-card header="<b>修理报价</b>">
            <b-row class="my-1">
                <b-col sm="6">
                    <div><label for="sku">Sku:{{Skuno}}</label></div>
                </b-col>
                <b-col sm="6">
                    <div><label for="mountno">MountNo:{{MountNo}}</label></div>
                </b-col>
            </b-row>
            <div>
                <label for="description">Description:{{ChineseDescription}}</label>
            </div>
            <b-row class="my-1">
                <b-col sm="3">
                    <div><label for="laborCost">LaborCost:{{LaborCost}}</label></div>
                </b-col>
                <b-col sm="3">
                    <div><label for="matieralCost">MatieralCost:{{MatieralCost}}</label></div>
                </b-col>
                <b-col sm="3">
                    <div><label for="stoneCost">StoneCost:{{StoneCost}}</label></div>
                </b-col>
                <b-col sm="3">
                    <div><label for="unitCost">UnitCost:{{UnitCost}}</label></div>
                </b-col>
            </b-row>
            <b-list-group>
                <b-list-group-item class="flex-column align-items-start">
                    <h5>Stone Info</h5>
                    <b-row class="my-1">
                        <b-col sm="4">
                            <div><label for="lot">Lot:</label></div>
                        </b-col>
                        <b-col sm="4">
                            <div><label for="stoneSize">StoneSize:</label></div>
                        </b-col>
                        <b-col sm="4">
                            <div><label for="mainStone">MainStone:</label></div>
                        </b-col>
                        <b-col sm="4">
                            <div><label for="stoneQty">StoneQty:</label></div>
                        </b-col>
                        <b-col sm="4">
                            <div><label for="stoneWeight">StoneWeight:</label></div>
                        </b-col>
                        <b-col sm="4">
                            <div><label for="stoneCost">StoneCost:</label></div>
                        </b-col>
                    </b-row>
                </b-list-group-item>
                <b-list-group-item class="flex-column align-items-start">
                    <h5>Stone Info</h5>
                    <b-row class="my-1">
                        <b-col sm="4">
                            <div><label for="lot">Lot:</label></div>
                        </b-col>
                        <b-col sm="4">
                            <div><label for="stoneSize">StoneSize:</label></div>
                        </b-col>
                        <b-col sm="4">
                            <div><label for="mainStone">MainStone:</label></div>
                        </b-col>
                        <b-col sm="4">
                            <div><label for="stoneQty">StoneQty:</label></div>
                        </b-col>
                        <b-col sm="4">
                            <div><label for="stoneWeight">StoneWeight:</label></div>
                        </b-col>
                        <b-col sm="4">
                            <div><label for="stoneCost">StoneCost:</label></div>
                        </b-col>
                    </b-row>
                </b-list-group-item>
                <b-list-group-item class="flex-column align-items-start">
                    <h5>Stone Info</h5>
                    <b-row class="my-1">
                        <b-col sm="4">
                            <div><label for="lot">Lot:</label></div>
                        </b-col>
                        <b-col sm="4">
                            <div><label for="stoneSize">StoneSize:</label></div>
                        </b-col>
                        <b-col sm="4">
                            <div><label for="mainStone">MainStone:</label></div>
                        </b-col>
                        <b-col sm="4">
                            <div><label for="stoneQty">StoneQty:</label></div>
                        </b-col>
                        <b-col sm="4">
                            <div><label for="stoneWeight">StoneWeight:</label></div>
                        </b-col>
                        <b-col sm="4">
                            <div><label for="stoneCost">StoneCost:</label></div>
                        </b-col>
                    </b-row>
                </b-list-group-item>
            </b-list-group>

            <div role="group">
                <label for="quotePrice">QuotePrice:</label>
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

        </b-card>

    </b-container>
</template>
<script>
    import axios from 'axios';
    import apiUrl from '@/service-api-config.js';
    export default {
        data() {
            return {
                Skuno: '123',
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
                console.log( 'response.data.message');
                console.log( response.data.message);
                if (response.data.code == 200 && response.data.message) {
                    if (response.data.message.length > 1) {
                        //console.log(response);
                        var mainInfo = response.data.message[0][0];
                        console.log(mainInfo);
                        this.Skuno = mainInfo.Skuno;
                        this.MountNo = mainInfo.MountNo;
                        this.StoneCost = mainInfo.StoneCost;
                        this.LaborCost = mainInfo.LaborCost;
                        this.MountImage = mainInfo.MountImage;
                        this.UnitCost = mainInfo.UnitCost;
                        this.Costcurrencycode = mainInfo.Costcurrencycode;
                        this.ChineseDescription = mainInfo.ChineseDescription;
                        this.MatieralCost = mainInfo.MatieralCost;
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