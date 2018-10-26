const multiReturnValueTest = require('./multi-return-value-business.js')
const newVipQuickJoin = require('./new-vip-quick-join.js');
//
const irmsUserLogin=require('./irms-userlogin-business.js');

//store business key
var businessSet = {
    irmsUserLogin,
    //
    multiReturnValueTest,
    newVipQuickJoin,
};
//
function getBusinessByKey(businessKey) {
    var business = null;
    try {
        if (!businessKey) {
            return null;
        }
        //
        business = businessSet[businessKey];
    } catch (err) {
        business = null;
    }
    return business;
}
//
module.exports = {
    getBusinessByKey
};