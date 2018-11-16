const soap = require('soap');
const desDisturb=require('./des-disturb')

//
module.exports = {
    sendMail
}
//
function sendMail(to, cc, subject, mailBody) {
    var url = 'http://www.mabelle.com/mailservice/mailcarrier.asmx?wsdl';
    var args = {
        subject: subject,
        content: desDisturb.encrypt(mailBody),
        address: to,//to
        from: 'info@mabelle.com',//info@madia.com.hk  //115
        cc: cc,
        bcc: '',
    };   
    return soap.createClientAsync(url).then((client) => {       
        client.addSoapHeader({Key:"mbMailService_!@#$%^"})
        return client.SendMailv2Async(args);
    }).then((result) => {
        var sendResult="";
        if(result&&result.length>0){
            sendResult= result[0].SendMailv2Result
        }
        return sendResult;
    }).catch(error=>{
        //log error info 
        //console.log(error)
    });
}

//sendMail('zhifei.zhang@mabelle.com.cn','','test','agcd');