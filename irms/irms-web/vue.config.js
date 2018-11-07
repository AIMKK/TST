module.exports = {
    baseUrl: './',//process.env.NODE_ENV === 'production' ? '/online/' : './',
    // outputDir: 'dist',
    // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
    // productionSourceMap: false,
    // devServer: {
    //     // 设置代理
    //       proxy: {
    //         "/cms": {
    //           target: "http://192.168.122.248:8080/", // 访问数据的计算机域名
    //           ws: true, // 是否启用websockets
    //           changOrigin: true //开启代理
    //         }
    //       }
    // }
};
