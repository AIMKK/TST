
const {
    irmsGetProdInfoForQuote, irmsGetFunctionID, irmsUserLogin,irmsGetApplyInfoNeedQuote,
} = require('./irms-db-business.js');
//
//store business key
var bussinessSet = {    
    irmsGetProdInfoForQuote,    
    irmsUserLogin,
    irmsGetFunctionID,
    irmsGetApplyInfoNeedQuote,
    //    
    // irmsATQuoteSave,
};
//
function getBussinessByKey(bussinessKey) {
    var bussiness = null;
    try {
        if (!bussinessKey) {
            return null;
        }
        //
        bussiness = bussinessSet[bussinessKey];
    } catch (err) {
        bussiness = null;
    }
    return bussiness;
}
//
module.exports = {
    getBussinessByKey
};