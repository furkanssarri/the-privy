const pool = require("../db/pool.js");

module.exports.getUserById = async (userId) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    return rows[0];
  } catch (err) {
    console.error(err);
  }
};

module.exports.getUserByUsername = async (username) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
    );
    return rows[0];
  } catch (err) {
    console.error(err);
  }
};

module.exports.createNewUser = async ({ username, hash, salt, isAdmin }) => {
  try {
    await pool.query(
      "INSERT INTO users (username, password_hash, salt, is_admin) VALUES ($1, $2, $3, $4)",
      [username, hash, salt, isAdmin],
    );
  } catch (err) {
    console.error(err);
  }
};
