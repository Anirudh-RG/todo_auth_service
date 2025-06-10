const db = require('../db');

async function createUserTableIfNotExists() {
  console.log("in create table");
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(255)
    )
  `);
}

async function findUserByUsername(username) {
  const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
  return result.rows[0];
}

async function createUser(username, hashedPassword, email = null) {
  await db.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3)', [username, hashedPassword, email]);
}

// New function to update user email
async function updateUserEmail(username, email) {
  const result = await db.query(
    'UPDATE users SET email = $1 WHERE username = $2 RETURNING *',
    [email, username]
  );
  return result.rows[0];
}

module.exports = {
  createUserTableIfNotExists,
  findUserByUsername,
  createUser,
  updateUserEmail, // Add this export
};