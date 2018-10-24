const multiReturnValueTest = require('./multi-return-value-business.js')
const newVipQuickJoin = require('./new-vip-quick-join.js')
var businessSet = {
    multiReturnValueTest,
    newVipQuickJoin,
};

function getBusiness(businessKey) {
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
    getBusiness
};