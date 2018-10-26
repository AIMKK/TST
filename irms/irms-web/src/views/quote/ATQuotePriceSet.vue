<template>
    <b-container fluid>
        <b-row class="my-1">
            <b-col sm="3">
                <P></P>
            </b-col>
            <b-col sm="6" class="container">
                <div>
                    <b>Quote Price Set</b>
                </div>
                <div class="content text-left">
                    <div class="form-group">
                        <label for="skuNo">SKU:</label>
                        <input type="text" class="form-control" id="skuNo" disabled v-model="skuNo" />
                    </div>
                    <div class="form-group">
                        <label for="mountNo">MountNo:</label>
                        <input type="text" class="form-control" id="mountNo" disabled v-model="mountNo" />
                    </div>
                    <div class="form-group">
                        <label for="descption">Descption:</label>
                        <input type="testarea" class="form-control" id="descption" disabled v-model="descption" />
                    </div>
                    <div class="form-group">
                        <label for="laborCost">LaborCost:</label>
                        <input type="number" class="form-control" id="laborCost" disabled v-model="laborCost" />
                    </div>
                    <div class="form-group">
                        <label for="matieralCost">MatieralCost:</label>
                        <input type="number" class="form-control" id="matieralCost" disabled v-model="matieralCost" />
                    </div>
                    <div class="form-group">
                        <label for="stoneCost">StoneCost:</label>
                        <input type="number" class="form-control" id="stoneCost" disabled v-model="stoneCost" />
                    </div>
                    <div class="form-group">
                        <label for="stoneCost">StoneCost:</label>
                        <input type="number" class="form-control" id="stoneCost" disabled v-model="stoneCost" />
                    </div>
                    <div class="form-group">
                        <label for="quotePrice">QuotePrice:</label>
                        <input type="number" class="form-control" id="quotePrice"  v-model="quotePrice" />
                    </div>
                    <b-button variant="success" id="btnQuoteSet" @click="quoteSet" :disabled="btnQuoteSetDisabled">Quote</b-button>
                </div>
            </b-col>
            <b-col sm="3">
                <P></P>
            </b-col>
        </b-row>
        <b-modal ref="myModalRef">
            {{modalMessage}}
        </b-modal>
    </b-container>
</template>
<script>
    export default {
        data() {
            return {
                btnQuoteSetDisabled:false,
                skuNo: '',
                mountNo: '',
                descption: '',
                laborCost: '',
                matieralCost: '',
                stoneCost: '',
                quotePrice:0,

            }
        },
    }
</script>
<style scoped>

</style>