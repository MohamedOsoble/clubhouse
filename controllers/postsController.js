const db = require("../db/queries");

module.exports.postsGet = async function (req, res, next) {
  const allPosts = await db.getAllPosts();
  res.render("posts", { posts: allPosts });
  // if (req.user) {
  //   res.render("posts", { posts: allPosts, user: req.user });
  // } else {
  //   res.render("posts", { posts: allPosts, user: false });
  // }
};

module.exports.loginPost = async function (req, res, next) {
  res.redirect("/");
};

module.exports.registerPost = async function (req, res, next) {
  const username = req.body.username;
  const { salt, hash } = genPassword(req.body.password);
  db.addNewUser(username, hash, salt);
  res.redirect("/login");
};
