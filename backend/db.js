const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: 'db',
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

module.exports = pool;
