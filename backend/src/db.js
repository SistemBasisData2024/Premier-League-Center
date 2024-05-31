const Pool = require('pg').Pool;

const pool = new Pool({
    host: "ep-hidden-hat-a10kf780.ap-southeast-1.aws.neon.tech",
    user: "sbd_9",
    database: "main_sbd_9",
    password: "F95NRVDCpKEJ",
    port: 5432,
    sslmode: "require",
    ssl: true,
});   
 
module.exports = pool;