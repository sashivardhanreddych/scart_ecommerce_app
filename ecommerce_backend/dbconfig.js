// const config = {
//     user :process.env.user,
//     password :process.env.password,
//     server:process.env.server,
//     database:process.env.database,
//     options:{
//         trustedconnection: true,
//         enableArithAbort : true,
//         // instancename: 'MSSQLEXPRESS'
//         instancename :'MSSQLSERVER'
//     },
//     port :1433
// }

// const config = {
//     user :"sa",
//     password :'Svrc#17031997',
//     server:'ec2-54-161-48-202.compute-1.amazonaws.com',
//     database:"DB_ECOMMERCE",
//     options:{
//         trustedconnection: true,
//         enableArithAbort : true,
//         instancename: 'MSSQLEXPRESS',
//         database:'db_dtass',
//         //  instancename :'MSSQLSERVER'
//     },
//     port :1433
// }



// configuration of database
const config = {
  user: "sa",
  password: "Svrc#17031997",
  server: "IM-RT-LP-609",
  database: "DB_ECOMMERCE",
  pool: { max: 100 },
  connectionTimeout: 300000,
  requestTimeout: 300000,
  options: { encrypt: false, enableArithAbort: true },
  port: 1433,
};

// const config = {
//     user :process.env.MSSQL_DB_LOGIN_USERNAME,
//     password :process.env.MSSQL_DB_LOGIN_PASSWORD,
//     server:process.env.MSSQL_SERVER_HOST,
//     database:process.env.MSSQL_DB_NAME,
//     pool: { max: process.env.MSSQL_CONNECTION_MAX_POOL },
//     connectionTimeout: 30000,
//     requestTimeout: 30000,
//     options: { encrypt: false,enableArithAbort : true },
//     port :1433
// }

module.exports = config;
