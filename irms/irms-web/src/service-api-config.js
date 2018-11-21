const LOCALURL = "http://192.168.122.248:3000/"
const APIURL = {
    login: LOCALURL + 'userAPI/login',
    quotePrice: LOCALURL + 'quoteAPI/getProductInfoForQuote',
    quoteSave:LOCALURL+'quoteAPI/atQuoteSave',
}

export default APIURL
// module.exports = APIURL;