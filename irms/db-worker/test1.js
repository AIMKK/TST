const config = {
    user: 'sa',
    password: 'peg-nr70v/j',
    server: '172.18.100.27',//  server: '127.0.0.1',// 172.18.100.27
   database: 'IRMSv2',//IRMSv2  //IRMS
port: 1433,
    options: {
        encrypt: true, // Use this if you're on Windows Azure
    tdsVersion:'7_2',
  
    }
}
const config2 = {
     user: 'sa',
     password: 'xxx',
     server: '192.168.122.248\\SQL2014EXPRESS', // You can use 'localhost\\instance' to connect to named instance
     database: 'tediousTestDB',

 options: {
     encrypt: true // Use this if you're on Windows Azure
 }
}

const config3="Server='192.168.122.248\\SQL2014EXPRESS',1433;Database=tediousTestDB;User Id=sa;Password=xxx;Encrypt=true"

const config4="Server='172.18.100.27',1433;Database=IRMSv2;User Id=sa;Password=xxx;Encrypt=true"

const config5="mssql://sa:xxx@192.168.122.248:1433/tediousTestDB?encrypt=true"

const config6="mssql://sa:xxx@172.18.100.27:1433/IRMSv2?encrypt=true"

const config7 = {
"user": 'sa',
"password": 'xxx',
"server": 'MB-UAT-IRMSDB',
"database": 'IRMSv2',
"port": '1433',
"dialect": "mssql",
"dialectOptions": {
    //"instanceName": ".",
encrypt: true // Use this if you're on Windows Azure
}
};

const config8 = {
"user": 'sa',
"password": 'xxx',
"server": 'VM-12-IRMSDB',
"database": 'IRMSv2',
"port": '1433',
"dialect": "mssql",
"dialectOptions": {
    //"instanceName": ".",
encrypt: true // Use this if you're on Windows Azure
}
};

const config9 = {
"user": 'sa',
"password": 'xxx',
"server": 'VM-2K3-IRMSDB',
"database": 'IRMS',
"port": '1433',
"dialect": "mssql",
"dialectOptions": {
    //"instanceName": ".",
encrypt: true // Use this if you're on Windows Azure
}
};

const sql = require('mssql')


function execute() {
sql.connect(config).then(pool => {
        // Query

        return pool.request()
            .query('select   top 2 * from CashFlow  '); // Users // CashFlow  //top 1 * from CashFlow

    })
    .then(result => {
        console.dir(result)
    }).catch(err => {
        console.log(err)
            // ... error checks
    })

sql.on('error', err => {
    console.log(err)
        // ... error handler
})
}

execute();