const BASEURL = "https://easy-mock.com/mock/5b8bf81fba0d0467e7762af9/"
const LOCALURL = "http://localhost:3000/"
const URL = {
    getShopMallInfo: BASEURL + 'malltestdata',
    getGoodsInfo: BASEURL + 'getGoodsInfo',
    registerUser: LOCALURL + 'user/register',
    login: LOCALURL + 'user/login',
    getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo',
}

module.exports = URL;