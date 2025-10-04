const pool = require("./pool").pool;

module.exports.sampleQuery = async function (a, b) {
  console.log(a, b);
};

module.exports.getUserByName = async function (username) {
  const { rows } = await pool.query({
    text: `SELECT * FROM users WHERE LOWER(username) = ($1)`,
    values: [String(username).toLocaleLowerCase()],
  });
  return rows[0];
};

module.exports.getUserByEmail = async function (email) {
  const { rows } = await pool.query({
    text: `SELECT * FROM users WHERE LOWER(email) = ($1)`,
    values: [String(email).toLocaleLowerCase()],
  });
  return rows[0];
};

module.exports.getUserById = async function (user_id) {
  const { rows } = await pool.query({
    text: `SELECT
        * FROM users
        WHERE id = ($1)`,
    values: [user_id],
  });
  return rows[0];
};

module.exports.getAllUsers = async function () {
  return ({ rows } = await pool.query(`SELECT
        * FROM users
        `));
};

module.exports.addNewUser = async function (username, email, hash, salt) {
  const query = {
    text: `INSERT INTO users (username, hash, salt, email) VALUES ($1, $2, $3, $4)`,
    values: [username, hash, salt, email],
  };
  await pool.query(query);
};

module.exports.getAllPosts = async function () {
  const query = {
    text: `SELECT users.id AS author_id, users.username AS author_name, 
    posts.title AS post_title, posts.content AS post_content, posts.date AS post_date
     FROM posts LEFT JOIN users on users.id = posts.author_id;`,
    values: [],
  };
  const { rows } = await pool.query(query);
  return rows;
};

module.exports.createNewPost = async function (authorId, title, content) {
  const query = {
    text: `INSERT INTO posts (author_id, title, content) VALUES ($1, $2, $3)`,
    values: [authorId, title, content],
  };
  await pool.query(query);
};

module.exports.updateMember = async function (userId, memberType) {
  const query = {
    text: `UPDATE users SET type = ($1) WHERE id = ($2) RETURNING id, type`,
    values: [memberType, userId],
  };
  await pool.query(query);
};
