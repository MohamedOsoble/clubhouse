const validators = require("../utils/validators");
const db = require("../db/queries");
const { all } = require("../routes/routes");
const { genPassword, validPassword } = require("../utils/passwordUtils");

module.exports.homeGet = async function (req, res, next) {
  res.render("index");
};

module.exports.loginGet = async function (req, res, next) {
  res.render("login");
};

module.exports.loginSuccess = async function (req, res, next) {
  res.render("index");
};

module.exports.loginFailure = async function (req, res, next) {
  res.render("login", {
    error: {
      msg: "Login failed, please doublecheck your username and/or password",
    },
  });
};

module.exports.logoutGet = async function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

module.exports.registerGet = async function (req, res, next) {
  const result = res.render("register");
};

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
