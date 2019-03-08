const msDB = require('mssql');
const { irmsConnConfig } = require('../config/db-conn-config.js');
const { convertToDatetimeString } = require('../helper/convert-to-datetime.js')
var dbconnPool;
//216
module.exports = {
    createDBConnPool,
    createUserLoginCmd,
    createGetProdInfoForQuoteCmd,
    createSaveWorkShopOrderMasterCmd,
    createSaveWorkShopOrderDetailCmd,
    createGetFunctionIDCmd,
    createGetApplyInfoNeedQuoteCmd,
    //test
    createNewVipQuickJoinCmd,
    createGetVIPPointsCmd,
    creategettestatCmd,
}
//
function createDBConnPool() {
    if (dbconnPool) {
        return dbconnPool;
    }
    dbconnPool = new msDB.ConnectionPool(irmsConnConfig).connect(); ////////msDB.connect(irmsConnConfig);
    return dbconnPool;
};
//
//UserLogin
function createUserLoginCmd(iniReqParam /* [pool or transaction] */) {
    //UserLogin
    var userLogin = function (userLoginParam) {
        userLoginParam=userLoginParam||{};
        var promise = new Promise(function (resolve, reject) {
            try {
                var request = new msDB.Request(iniReqParam);
                request.input('UserCode', msDB.VarChar(10), userLoginParam.UserCode);
                request.input('Password', msDB.VarChar(100), userLoginParam.Password);
                //         
                resolve(request.execute('SP_UserMasterLogin'));
            } catch (error) {
                reject(error);
            }
        });

        return promise;
    };

    return userLogin;
}

//getprodInfoForQuote
function createGetProdInfoForQuoteCmd(iniReqParam /* [pool or transaction] */) {

    //getProdInfoForQuote
    var getProdInfoForQuote = function (getProdInfoForQuoteParam) {
        getProdInfoForQuoteParam=getProdInfoForQuoteParam||{};
        var promise = new Promise(function (resolve, reject) {
            try {
                var request = new msDB.Request(iniReqParam);
                request.input('SkuNo', msDB.VarChar(10), getProdInfoForQuoteParam.SkuNo);
                resolve(request.execute('SP_ProdInfoForQuote_Get'));
            } catch (error) {
                reject(error);
            }
        });
        return promise;

    };

    return getProdInfoForQuote;
}

/*
*createWorkShopOrderMasterCmd
*/
function createSaveWorkShopOrderMasterCmd(iniReqParam /* [pool or transaction] */) {
    //saveWorkShopOrderMaster
    var saveWorkShopOrderMaster = function (workshopOrderMasterParam) {
        workshopOrderMasterParam=workshopOrderMasterParam||{};
        var promise = new Promise(function (resolve, reject) {
            try {
                //对参数进行转换，如果失败就中止               
                //
                var request = new msDB.Request(iniReqParam);
                request.input('OrderDate', msDB.VarChar(25), convertToDatetimeString(workshopOrderMasterParam.OrderDate));//convertToDatetime(workshopOrderMasterParam.OrderDate)
                request.output('WorkShopOrderNo', msDB.VarChar(20), '');
                request.input('WorkShopCode', msDB.VarChar(10), workshopOrderMasterParam.WorkShopCode);
                request.input('PrintChopCode', msDB.VarChar(10), workshopOrderMasterParam.PrintChopCode);
                request.input('LocationCode', msDB.VarChar(10), workshopOrderMasterParam.LocationCode);
                request.input('PickUpLocation', msDB.VarChar(10), workshopOrderMasterParam.PickUpLocation);
                request.input('Salesman', msDB.VarChar(10), workshopOrderMasterParam.Salesman);
                request.input('VIPCode', msDB.VarChar(10), workshopOrderMasterParam.VIPCode);
                request.input('VIPName', msDB.NVarChar(400), workshopOrderMasterParam.VIPName);
                request.input('ContactMobile', msDB.VarChar(20), workshopOrderMasterParam.ContactMobile);
                request.input('ReferenceNo', msDB.VarChar(20), workshopOrderMasterParam.ReferenceNo);
                request.input('CurrencyCode', msDB.VarChar(10), workshopOrderMasterParam.CurrencyCode);
                request.input('EstimatedTagPrice', msDB.Decimal(18, 4), workshopOrderMasterParam.EstimatedTagPrice);
                request.input('NetPaidAmount', msDB.Decimal(18, 4), workshopOrderMasterParam.NetPaidAmount);
                request.input('OrderQty', msDB.SmallInt, workshopOrderMasterParam.OrderQty);
                request.input('Remark', msDB.NVarChar(msDB.MAX), workshopOrderMasterParam.Remark);
                request.input('UpdateUserCode', msDB.VarChar(10), workshopOrderMasterParam.UpdateUserCode);
                request.input('EstimatedCompleteDate', msDB.VarChar(25), convertToDatetimeString(workshopOrderMasterParam.EstimatedCompleteDate));
                request.input('WorkShopPickupDate', msDB.VarChar(25), convertToDatetimeString(workshopOrderMasterParam.WorkShopPickupDate));
                request.input('WorkShopReturnDate', msDB.VarChar(25), convertToDatetimeString(workshopOrderMasterParam.WorkShopReturnDate));
                request.input('FactoryReadDate', msDB.VarChar(25), convertToDatetimeString(workshopOrderMasterParam.FactoryReadDate));
                request.input('FactoryProposeDate', msDB.VarChar(25), convertToDatetimeString(workshopOrderMasterParam.FactoryProposeDate));
                request.input('FactoryReadUserCode', msDB.VarChar(10), workshopOrderMasterParam.FactoryReadUserCode);                
                request.input('FactoryQuoteDate', msDB.VarChar(25), convertToDatetimeString(workshopOrderMasterParam.FactoryQuoteDate));
                request.input('FactoryQuotePrice', msDB.Decimal(18, 4), workshopOrderMasterParam.FactoryQuotePrice);
                request.input('FactoryQuoteUserCode', msDB.VarChar(10), workshopOrderMasterParam.FactoryQuoteUserCode);
                request.input('ShopConfirmDate', msDB.VarChar(25), convertToDatetimeString(workshopOrderMasterParam.ShopConfirmDate));
                request.input('ShopConfirmUserCode', msDB.VarChar(10), workshopOrderMasterParam.ShopConfirmUserCode);
                request.input('EstimatedArrivalDate', msDB.VarChar(25), convertToDatetimeString(workshopOrderMasterParam.EstimatedArrivalDate));
                request.input('EstimatedArrivalUserCode', msDB.VarChar(10), workshopOrderMasterParam.EstimatedArrivalUserCode);
                request.input('FactoryDelayToDate', msDB.VarChar(25), convertToDatetimeString(workshopOrderMasterParam.FactoryDelayToDate));
                request.input('ReworkDate', msDB.VarChar(25), convertToDatetimeString(workshopOrderMasterParam.ReworkDate));
                request.input('ReworkReason', msDB.NVarChar(msDB.MAX), workshopOrderMasterParam.ReworkReason);
                request.input('ReworkUserCode', msDB.VarChar(10), workshopOrderMasterParam.ReworkUserCode);
                request.input('SettleDate', msDB.VarChar(25), convertToDatetimeString(workshopOrderMasterParam.SettleDate));
                request.input('SettleAmount', msDB.Decimal(18, 4), workshopOrderMasterParam.SettleAmount);
                request.input('SettleUserCode', msDB.VarChar(10), workshopOrderMasterParam.SettleUserCode);
                request.input('InfoRemark', msDB.NVarChar(msDB.MAX), workshopOrderMasterParam.InfoRemark);
                request.input('VersionNo', msDB.SmallInt, workshopOrderMasterParam.VersionNo);
                request.input('TranferPickupDate', msDB.VarChar(25), convertToDatetimeString(workshopOrderMasterParam.TranferPickupDate));
                request.input('CustomerPickupDate', msDB.VarChar(25), convertToDatetimeString(workshopOrderMasterParam.CustomerPickupDate));
                request.input('WorkShopFinalPurpose', msDB.NVarChar(msDB.MAX), workshopOrderMasterParam.WorkShopFinalPurpose);
                request.input('CompleteSku', msDB.VarChar(10), workshopOrderMasterParam.CompleteSku);
                request.input('WorkShopCompleteDate', msDB.VarChar(25), convertToDatetimeString(workshopOrderMasterParam.WorkShopCompleteDate));
                request.input('WorkshopReturnReworkDate', msDB.VarChar(25), convertToDatetimeString(workshopOrderMasterParam.WorkshopReturnReworkDate));
                request.input('WorkShopRemark', msDB.NVarChar(msDB.MAX), workshopOrderMasterParam.WorkShopRemark);
                request.input('ArrivalDate', msDB.VarChar(25), convertToDatetimeString(workshopOrderMasterParam.ArrivalDate));
                //
                resolve(request.execute('SP_WorkShopOrderMaster_Set'));
            } catch (error) {
                reject(error);
            }
        });

        return promise;
    };

    return saveWorkShopOrderMaster;
}

/*
*createSaveWorkShopOrderDetailCmd
*/
function createSaveWorkShopOrderDetailCmd(iniReqParam /* [pool or transaction] */) {
    //saveWorkShopOrderDetail
    var saveWorkShopOrderDetail = function (workShopOrderDetailParam) {
        workShopOrderDetailParam=workShopOrderDetailParam||{};
        var promise = new Promise(function (resolve, reject) {
            try {
                var request = new msDB.Request(iniReqParam);                
                request.input('WorkShopOrderNo', msDB.VarChar(20), workShopOrderDetailParam.WorkShopOrderNo);
                request.input('SequenceNo', msDB.SmallInt, workShopOrderDetailParam.SequenceNo);
                request.input('InvoiceNo', msDB.VarChar(20), workShopOrderDetailParam.InvoiceNo);
                request.input('InvoiceSN', msDB.SmallInt, workShopOrderDetailParam.InvoiceSN);
                request.input('SkuNo', msDB.VarChar(10), workShopOrderDetailParam.SkuNo);
                request.input('SkuDit', msDB.VarChar(10), workShopOrderDetailParam.SkuDit);
                request.input('MaterialCode', msDB.VarChar(10), workShopOrderDetailParam.MaterialCode);
                request.input('MountNo', msDB.VarChar(10), workShopOrderDetailParam.MountNo);
                request.input('ProductCode', msDB.VarChar(10), workShopOrderDetailParam.ProductCode);
                request.input('CounterCode', msDB.VarChar(10), workShopOrderDetailParam.CounterCode);
                request.input('SKUDescription', msDB.NVarChar(msDB.MAX), workShopOrderDetailParam.SKUDescription);
                request.input('OriginalTagPrice', msDB.Decimal(18, 4), workShopOrderDetailParam.OriginalTagPrice);
                request.input('EstimatedTagPrice', msDB.Decimal(18, 4), workShopOrderDetailParam.EstimatedTagPrice);
                request.input('EstimatedNetPrice', msDB.Decimal(18, 4), workShopOrderDetailParam.EstimatedNetPrice);
                request.input('OrderQty', msDB.SmallInt, workShopOrderDetailParam.OrderQty);
                request.input('PurposeCode', msDB.VarChar(10), workShopOrderDetailParam.PurposeCode);
                request.input('UpdateUserCode', msDB.VarChar(10), workShopOrderDetailParam.UpdateUserCode);
                //         
                resolve(request.execute('SP_WorkShopOrderDetail_Set'));
            } catch (error) {
                reject(error);
            }
        });
        return promise;
    };

    return saveWorkShopOrderDetail;
}

/*
*createGetFunctionIDCmd
*/
function createGetFunctionIDCmd(iniReqParam /* [pool or transaction] */) {
    //GetFunctionID
    var getFunctionID = function (getFunctionIDParam) {
        getFunctionIDParam=getFunctionIDParam||{};
        var promise = new Promise(function (resolve, reject) {
            try {
                var request = new msDB.Request(iniReqParam);
                request.input('UserCode', msDB.VarChar(10), getFunctionIDParam.UserCode);
                //         
                resolve(request.execute('testFunctionID_Get'));
            } catch (error) {
                reject(error);
            }
        });

        return promise;
    };

    return getFunctionID;
}

/*
*createGetApplyInfoNeedQuoteCmd
*/
function createGetApplyInfoNeedQuoteCmd(iniReqParam /* [pool or transaction] */) {
    //GetApplyInfoNeedQuote
    var getApplyInfoNeedQuote = function (getApplyInfoNeedQuoteParam) {
        getApplyInfoNeedQuoteParam=getApplyInfoNeedQuoteParam||{};
        var promise = new Promise(function (resolve, reject) {
            try {
                var request = new msDB.Request(iniReqParam);
                request.input('UserCode', msDB.VarChar(10), getApplyInfoNeedQuoteParam.UserCode);
                //         
                resolve(request.execute('SP_ApplyInfoNeedQuoteByUserCode_Get'));
            } catch (error) {
                reject(error);
            }
        });
        return promise;
    };

    return getApplyInfoNeedQuote;
}

//getprodInfoForQuote
function creategettestatCmd(iniReqParam /* [pool or transaction] */) {

    //getProdInfoForQuote
    var getProdInfoForQuote = function (paramtest) {
        paramtest=paramtest||{};
        var promise = new Promise(function (resolve, reject) {
            try {
                var request = new msDB.Request(iniReqParam);
                request.input('WorkShopOrderNo', msDB.VarChar(20), paramtest.WorkShopOrderNo);
                resolve(request.execute('SP_WorkShopOrderMaster_Get'));
            } catch (error) {
                reject(error);
            }
        });
        return promise;

    };

    return getProdInfoForQuote;
}

//create request command
function createNewVipQuickJoinCmd(iniReqParam /* [pool or transaction] */) {

    //用最少信息创建一个会员
    var newVipQuickJoin = function (newVipQuickJoinParam) {
        var request = new msDB.Request(iniReqParam);
        request.input('CompanyCode', msDB.VarChar, newVipQuickJoinParam.CompanyCode);
        request.input('VIPCode', msDB.VarChar, newVipQuickJoinParam.VIPCode);
        request.input('LocationCode', msDB.VarChar, newVipQuickJoinParam.LocationCode);
        request.input('ChineseName', msDB.NVarChar, newVipQuickJoinParam.ChineseName);
        request.input('EnglishName', msDB.NVarChar, newVipQuickJoinParam.EnglishName);
        request.input('MobilePhone', msDB.VarChar, newVipQuickJoinParam.MobilePhone);
        request.input('LastUpdate', msDB.VarChar, newVipQuickJoinParam.LastUpdateUser);
        request.input('IsTravelVip', msDB.Bit, newVipQuickJoinParam.IsTravelVip);
        request.input('AgentBuy', msDB.VarChar, newVipQuickJoinParam.AgentBuy);
        return request.execute('SP_newVipQuickJoin_Set');
    };


    return newVipQuickJoin;
}

//create request command
function createGetVIPPointsCmd(iniReqParam /* [pool or transaction] */) {

    //用最少信息创建一个会员
    var getVIPPoints = function (getVIPPointsParam) {
        var request = new msDB.Request(iniReqParam);
        request.input('VIPCode', msDB.VarChar, getVIPPointsParam.VIPCode);
        return request.execute('SP_VIPPoints_Get');
    };


    return getVIPPoints;
}
