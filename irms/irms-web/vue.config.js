const vuxLoader = require('vux-loader');
//
module.exports = {
    baseUrl: './',
    configureWebpack: config => {
        vuxLoader.merge(config, {
            options: {},
            plugins: [
                {
                    name: 'vux-ui'
                },
                // {
                //     name: 'i18n',
                //     vuxStaticReplace: true,
                //     staticReplace: true,
                //     extractToFiles: 'src/locales/components.yml',
                //     localeList: ['en', 'zh-CN', 'tw']
                // }
            ]
        })
    }
};
