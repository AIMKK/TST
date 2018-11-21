const { createDBConnPool,
    createSaveWorkShopOrderMasterCmd,
    createSaveWorkShopOrderDetailCmd } = require('../cmd/irms-db-cmd.js');

const log4js = require('log4js');
//
module.exports = altQuoteSave;

/*
*altQuoteSave
*/
function altQuoteSave(workshopOrderParam) {
    var irmsConn = createDBConnPool();
    //首先检查 workshopOrderMaster or workShopOrderDetail 是不是空白，空白不给保存
    console.log('workshopOrderParam.workshopOrderMaster');
    console.log(workshopOrderParam);
    return irmsConn.then(pool => {
        var trans = pool.transaction();
        var workOrderMstrCmd = createSaveWorkShopOrderMasterCmd(trans);//master        
        var workOrderDetailCmd = createSaveWorkShopOrderDetailCmd(trans);//detail
        //
        return trans.begin().then(() => {
            return workOrderMstrCmd(workshopOrderParam.workshopOrderMaster);
        }).then((result) => {
            console.log(result)
            var orderNO;
            try {
                orderNO = result.output.WorkShopOrderNo;
                if(orderNO.trim().length==0)
                workshopOrderParam.workShopOrderDetail.WorkShopOrderNo = orderNO;
            } catch (error) {
                console.log(error);
                throw 'cant not get workshoporderNo';
            }
            //
            return workOrderDetailCmd(workshopOrderParam.workShopOrderDetail).then(() => {
                return 'save success:' + orderNO;
            });
        }).then((result) => {
            return trans.commit().then((error) => {
                if (error) {
                    console.log(error)
                }
                return result;
            });
        }).catch(error => {
            // console.log(error)
            return trans.rollback().then(err => {
                if (err) {
                    console.log('rollback error:' + err);
                }
                return error;
            });
        });
    });
}