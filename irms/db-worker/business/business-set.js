
const newVipQuickJoin = require('./new-vip-quick-join.js');
//
const irmsUserLogin=require('./irms-userlogin-business.js');
const irmsGetProdInfoForQuote=require('./irms-prodinfo-quote-business.js');
const irmsATQuoteSave=require('./irms-atquote-business.js');
//
//store business key
var bussinessSet = {
    irmsUserLogin,
    irmsGetProdInfoForQuote,
    irmsATQuoteSave,
    //   
    newVipQuickJoin,
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