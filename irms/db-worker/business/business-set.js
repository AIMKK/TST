
const newVipQuickJoin = require('./new-vip-quick-join.js');
//
const irmsATQuoteSave = require('./irms-atquote-business.js');

const {
    irmsGetProdInfoForQuote, irmsGetFunctionID, irmsUserLogin,
} = require('./irms-db-business.js');
//
//store business key
var bussinessSet = {    
    irmsGetProdInfoForQuote,    
    irmsUserLogin,
    irmsGetFunctionID,
    //   
    newVipQuickJoin,
    irmsATQuoteSave,
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