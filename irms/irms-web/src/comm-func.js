
export function getLangCodeByKey(key) {
    var langCode = 'CHS';
    key = (key || '').toUpperCase();
    if (key == 'CHS' || key == 'CHI' || key == 'ENG') {
        langCode = key;
    }
    return langCode;
};

export function fixStyleForHuawei() {
    // var ua = navigator.userAgent;
    // if (!ua.match(/HUAWEI/i) || !ua.match(/MQQBrowser/i)) return;
    // // 使页面加长200px
    // this.fixStyle = {
    //    'padding-bottom': '200px'
    // }
    // this.$nextTick(function() {
    //     var _this = this;
    //     setTimeout(function() {
    //         window.scrollTo(0, 200); // 上滑200px
    //     }, 200);
    //     setTimeout(function() {
    //          window.scrollTo(0, 0); // 下滑到0位置，复原
    //     }, 500);
    //     setTimeout(function() {
    //         _this.fixStyle = null; // 删除页面加长的部分
    //     }, 1000);
    // });
}

export function isSupportUserAgent() {
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    var isAlipayClient = ua.indexOf('alipayclient') != -1;
    var isAndroid = ua.indexOf('android') != -1;
    var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);
    var ismobileSide = /Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent);
    //
    if (!ismobileSide) {
        return true;
    }
    else if (isWeixin) {
        return true;
    }
    else if (isAlipayClient) {
        return true;
    }
    else {
        return false;
    }

}
