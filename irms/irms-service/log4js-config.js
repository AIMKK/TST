module.exports = {
    appenders: {
        console: {
            type: 'console'
        },
        dateFile: {
            type: 'dateFile',
            filename: __dirname + '/AppLogs/log',
            alwaysIncludePattern: true,
            maxLogSize: 10 * 1024 * 1024, // = 10Mb
            backups: 5, // keep five backup files
            pattern: '_yyyy-MM-dd.log',
            encoding: 'utf-8',//default "utf-8",  
            daysToKeep: 180,//半年          
        },
        ////server: { type: 'tcp-server', host: '127.0.0.1' }
    },
    categories: {
        default: { appenders: ['dateFile'], level: 'debug' },
        console: { appenders: ['console'], level: 'debug' },
    },    
    pm2: true,///// need to install : pm2 install pm2-intercom  
    //pm2InstanceVar: 'INSTANCE_ID',//
    disableClustering: true,
}