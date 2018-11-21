
module.exports = {
    convertToDatetime
}
//
function convertToDatetime(value) {
    var datetime;
    try {
        if (value == null || value == undefined) {
            return null;
        } else {
            datetime = new Date(value);
            if (Object.prototype.toString.call(datetime) === "[object Date]") {
                // it is a date
                if (isNaN(datetime.getTime())) {  // datetime.valueOf() could also work
                    datetime=null;
                }
            } else {
                datetime=null;
            }
        }
    } catch (error) {
        datetime = null;
    }
    //
    return datetime;
}