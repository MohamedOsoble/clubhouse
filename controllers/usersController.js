const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const genPassword = require("../utils/passwordUtils").genPassword;

module.exports.loginGet = async function (req, res, next) {
  res.render("login");
};

module.exports.loginSuccess = async function (req, res, next) {
  res.render("index", { messages: ["Login Successful!"] });
};

module.exports.loginFailure = async function (req, res, next) {
  res.render("login", {
    error: {
      msg: "Login failed, please doublecheck your username and/or password",
    },
  });
};

module.exports.logoutSuccess = async function (req, res, next) {
  res.render("index", { messages: ["You have successfully logged out"] });
};

module.exports.logoutGet = async function (req, res, next) {
  await req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
};

module.exports.loginPost = async function (req, res, next) {
  res.redirect("/");
};

module.exports.registerGet = async function (req, res, next) {
  res.render("register");
};

module.exports.registerPost = async function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("register", {
      errors: errors.array(),
    });
  }
  const username = req.body.username;
  const email = req.body.email;
  const { salt, hash } = genPassword(req.body.password);
  db.addNewUser(username, email, hash, salt);
  return res.redirect("/register-success");
};

module.exports.registerSuccess = async function (req, res, next) {
  res.render("/login", {
    messages: ["Registration Successful, please log in"],
  });
};
