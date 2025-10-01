const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const genPassword = require("../utils/passwordUtils").genPassword;

const registrationValidator = [
  body("username")
    .isLength({ min: 4, max: 15 })
    .withMessage("Username must be between 4 - 15 Characters long")
    .isAlphanumeric()
    .withMessage("Username must only contain letters and numbers")
    .custom(async (value) => {
      const existingUser = await db.getUserByName(value);
      if (existingUser) {
        throw new Error("Username already in use");
      }
    })
    .exists()
    .withMessage("Username is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Minimum password length is 8")
    .exists()
    .withMessage("Password is a required field"),
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .exists()
    .withMessage("Email field is required")
    .custom(async (value) => {
      const existingEmail = await db.getUserByEmail(value);
      if (existingEmail) {
        throw new Error("Email already in use");
      }
    })
    .withMessage("Email already in use"),
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

module.exports.logoutGet = async function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

module.exports.loginPost = async function (req, res, next) {
  res.redirect("/");
};

module.exports.registerGet = async function (req, res, next) {
  const result = res.render("register");
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
  res.redirect("/login");
};
