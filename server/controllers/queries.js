const pool = require("../db/pool.js");

module.exports.fetchUserById = async (userId) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    return rows[0];
  } catch (err) {
    console.error(`Error fetching the user with the id from DB.`, err);
  }
};

module.exports.fetchUserByUsername = async (username) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
    );
    return rows[0];
  } catch (err) {
    console.error(`Error fetching the user with ${username} from DB.`, err);
  }
};

module.exports.addUserToDb = async ({ username, hash, salt, role }) => {
  try {
    await pool.query(
      "INSERT INTO users (username, password_hash, salt, role) VALUES ($1, $2, $3, $4)",
      [username, hash, salt, role],
    );
  } catch (err) {
    console.error("Error adding the user to the DB", err);
  }
};

module.exports.fetchAllPostsWithAuthors = async () => {
  try {
    const { rows } = await pool.query(`
      SELECT posts.*, users.username
      FROM posts
      JOIN users ON posts.author_id = users.id
      ORDER BY posts.created_at DESC;
    `);
    return rows;
  } catch (err) {
    console.error("Error fetching posts from DB", err);
    throw err;
  }
};

module.exports.fetchPostById = async (postId) => {
  try {
    const { rows } = await pool.query(
      `
    SELECT posts.*, users.username
    FROM posts
    JOIN users ON posts.author_id = users.id
    WHERE posts.id = $1;
    `,
      [postId],
    );
    return rows[0];
  } catch (err) {
    console.error(`Error fetching post from DB`, err);
  }
};

module.exports.addPostToDb = async ({ content, authorId }) => {
  try {
    const { rows } = await pool.query(
      "INSERT INTO posts (content, author_id) VALUES ($1, $2)",
      [content, authorId],
    );
    return rows[0];
  } catch (err) {
    console.error("Error adding the new post to the DB.", err);
  }
};

module.exports.updatePostInDb = async (postId, content) => {
  try {
    const { rows } = await pool.query(
      `
      UPDATE posts
      SET 
        content = $1,
        updated_at = NOW()
      WHERE id = $2
      RETURNING *;
      `,
      [content, postId],
    );

    return rows[0];
  } catch (err) {
    console.error("Error updating post in the DB:", err);
  }
};

module.exports.deletePostFromDb = async (id) => {
  try {
    await pool.query("DELETE FROM posts WHERE id = $1", [id]);
  } catch (err) {
    console.error("Error deleting post from DB.", err);
  }
};
