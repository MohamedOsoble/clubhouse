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

module.exports.addNewUser = async function (username, hash, salt) {
  const query = {
    text: `INSERT INTO users (username, hash, salt) VALUES ($1, $2, $3)`,
    values: [username, hash, salt],
  };
  console.log(query);
  await pool.query(query);
};

module.exports.getAllPosts = async function () {
  const query = {
    text: `SELECT * FROM posts`,
    values: [],
  };
  return ({ rows } = await pool.query(query));
};

module.exports.createNewPost = async function (authorId, title, content) {
  const query = {
    text: `INSERT INTO posts (author_id, title, content) VALUES ($1, $2, $3)`,
    values: [authorId, title, content],
  };
  await pool.query(query);
};
