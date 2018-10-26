const irmsDB = require('../cmd/irms-db-cmd.js');
module.exports = userLogin;

//userLoginParam{usercode,password}//
function userLogin(userLoginParam) {
    var irmsConn = irmsDB.createDBConnPool();
    //
    return irmsConn.then(pool => {
        var loginCmd = irmsDB.createUserLoginCmd(pool);
        return loginCmd(userLoginParam).then(result => {
            //根据具体的业务来确定，怎么处理result的值直接返回还是包装一次
            //如果用户名密码正确，那么，recordset 就会有值,获取第一个值即可
            var user="";
            try {
                if (result && result.recordset) { 
                    if(result.recordset.length>0){
                        user=result.recordset[0];
                    }
                }
            }catch(error){
                user="";
            }            
            return user;

        }).catch((error) => {
            //记录日志
            console.log(error);
            return null;
        })
    }).catch(error => {
        //记录日志
        console.log(error)
        return null;
    });
};