const irmsDB = require('../cmd/irms-db-cmd.js');
module.exports = getProdInfoForQuote;

//GetProdInfoForQuote
function getProdInfoForQuote(prodInfoForQuoteParam) {
    var irmsConn = irmsDB.createDBConnPool();
    //
    return irmsConn.then(pool => {
        var quoteCmd = irmsDB.createGetProdInfoForQuoteCmd(pool);
        return quoteCmd(prodInfoForQuoteParam).then(result => {
            var ProdInfo="";
            try {
                //这个地方返回的是两个集合               
                if (result && result.recordsets) {
                    if(result.recordsets.length>0){
                        ProdInfo=result.recordsets;
                    }
                }
            }catch(error){
                ProdInfo="";
            }
            return ProdInfo;

        }).catch((error) => {
            //记录日志
            console.log('命令执行不正确--')
            console.log(error);
            console.log('---------------')
            return '命令执行不正确';            
        })
    }).catch(error => {
        //记录日志
        console.log('貌似连接不给力--')
        console.log(error)
        console.log('---------------')
        return '貌似连接不给力！';
    });
};