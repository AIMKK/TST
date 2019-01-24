const LOCALURL = "http://192.168.122.244:3000/"
const APIURL = {
    login: LOCALURL + 'irmsAPI/login',
    getFunctionID: LOCALURL + 'irmsAPI/getFunctionID',
    quotePrice: LOCALURL + 'quoteAPI/getProductInfoForQuote',
    quoteSave:LOCALURL+'quoteAPI/atQuoteSave',
}

export default APIURL
// module.exports = APIURL;