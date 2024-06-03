const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    host: process.env.USER_HOST,
    user: process.env.USER_NAME,
    database: process.env.USER_DATABASE,
    password: process.env.USER_PASSWORD,
    port: process.env.USER_PORT,
    sslmode: "require",
    ssl: true,
});   
 
module.exports = pool;