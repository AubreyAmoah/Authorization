const { createPool } = require('mysql2');
const dotenv = require('dotenv');

dotenv.config({ path: './.env'});

const pool = createPool({
    port:process.env.DB_PORT,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB,
    connectionLimit: 10
});

module.exports = pool;