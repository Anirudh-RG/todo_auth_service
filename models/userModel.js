const db = require('../db');

async function createUserTableIfNotExists() {
  console.log("am i stuck")
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    )
  `);
}

async function findUserByUsername(username) {
  const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
  return result.rows[0];
}

async function createUser(username, hashedPassword) {
  await db.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
}

module.exports = {
  createUserTableIfNotExists,
  findUserByUsername,
  createUser,
};
