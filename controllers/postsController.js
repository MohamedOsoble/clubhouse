const db = require("../db/queries");

module.exports.postsGet = async function (req, res, next) {
  const allPosts = await db.getAllPosts();
  allPosts.forEach((post) => {
    let date = new Date(post.post_date);
    post.post_date = date.toUTCString();
  });
  res.render("posts", { posts: allPosts });
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

module.exports.getCreatePost = async function (req, res, next) {
  res.render("create-post");
};

module.exports.addNewPost = async function (req, res, next) {
  await db.createNewPost(req.body.authorid, req.body.title, req.body.content);
  res.redirect("/view-posts");
};

module.exports.deletePost = async function (req, res, next) {
  await db.deletePost(req.body.postid);
  res.redirect("/view-posts");
};
