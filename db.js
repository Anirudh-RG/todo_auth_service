// db.js
const { Pool } = require('pg');
const dotenv = require('dotenv');

// Ensure environment variables are loaded
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 5432,
});

module.exports = pool;