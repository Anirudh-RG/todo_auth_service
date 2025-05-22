// db.js
const { Pool } = require('pg');
const dotenv = require('dotenv');

// Ensure environment variables are loaded
dotenv.config();

const pool = new Pool({
  host: "43.204.110.68",
  user: "postgres",
  password: "XrAB75v0",
  database: "authdb",
  port: 5432,
});

module.exports = pool;