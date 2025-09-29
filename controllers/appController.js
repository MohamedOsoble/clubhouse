const db = require("../db/queries");
const { all } = require("../routes/routes");
const { genPassword, validPassword } = require("../utils/passwordUtils");

const sampleContent = [
  {
    author_id: 1,
    author_name: "Mohamed",
    post_id: 1,
    post_title: "First post",
    post_content: "Some sort of lorem ipsum and so forth",
    post_date: "25-09-24 11:00:00",
  },
  {
    author_id: 1,
    author_name: "Mohamed",
    post_id: 2,
    post_title: "Second post",
    post_content: "Some sort of lorem ipsum and so forth",
    post_date: "25-09-24 12:00:00",
  },
  {
    author_id: 1,
    author_name: "Mohamed",
    post_id: 3,
    post_title: "Third post",
    post_content: "Some sort of lorem ipsum and so forth",
    post_date: "25-09-24 13:00:00",
  },
  {
    author_id: 1,
    author_name: "Mohamed",
    post_id: 4,
    post_title: "Fourth post",
    post_content: "Some sort of lorem ipsum and so forth",
    post_date: "25-09-24 14:00:00",
  },
];

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

module.exports.registerGet = async function (req, res, next) {
  res.render("register");
};

module.exports.postsGet = async function (req, res, next) {
  if (req.user) {
    res.render("posts", { posts: sampleContent, user: req.user });
  } else {
    res.render("posts", { posts: sampleContent, user: false });
  }
};

module.exports.loginPost = async function (req, res, next) {
  res.redirect("/");
};

module.exports.registerPost = async function (req, res, next) {
  const username = req.body.username;
  const { salt, hash } = genPassword(req.body.password);
  console.log(salt, hash);
  db.addNewUser(username, hash, salt);
  res.redirect("/login");
};
