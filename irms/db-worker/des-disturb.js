const crypto = require('crypto');
//
const rgbKey = 'zuan.com';
const rgbIV = 'zuan.com';
const algorithm = { ecb: 'des-ecb', cbc: 'des-cbc' };
//
module.exports = {
    encrypt,
    decrypt,
};
//
function encrypt(plaintext) {
    var cipher = "";
    try {
        var key = new Buffer(rgbKey);
        var iv = new Buffer(rgbIV);
        //
        cipher = crypto.createCipheriv(algorithm.cbc, key, iv);
        cipher.setAutoPadding(true)  //default true
        var ciph = cipher.update(plaintext, 'utf8', 'base64');
        ciph += cipher.final('base64');
    }
    catch (error) {
        //log error
        console.log(error)
    }

    return ciph;
};
//
function decrypt(encryptText) {
    var txt = "";
    try {
        var key = new Buffer(rgbKey);
        var iv = new Buffer(rgbIV);
        var decipher = crypto.createDecipheriv(algorithm.cbc, key, iv);
        decipher.setAutoPadding(true);
        txt = decipher.update(encryptText, 'base64', 'utf8');
        txt += decipher.final('utf8');
    } catch (error) {
        //log error
    }
    return txt;
};