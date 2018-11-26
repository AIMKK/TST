
module.exports = {
    convertToDatetimeString
}

/*
*convertToDatetimeString
*如果遇到非法的字符串直接返回 1900-01-01
*/
function convertToDatetimeString(value) {
    var resultString;
    try {
        //1900-01-01 00:00:00
        if (value == null || value == undefined||value.trim()=='') {
            resultString = '1900-01-01';
        }
        //
        var datetimeTemp = new Date(value);
        if (Object.prototype.toString.call(datetimeTemp) === "[object Date]") {// it is a date            
            if (isNaN(datetimeTemp.getTime())) {  // datetime.valueOf() could also work
                resultString = '1900-01-01';
            } else {
                resultString = value;//把原来的值返回过来
            }
        } else {
            resultString = '1900-01-01';
        }
    } catch (error) {
        resultString = '1900-01-01';
    }

    //
    return resultString;
}