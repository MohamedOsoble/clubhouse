// Required module imports
const express = require("express");
const path = require("node:path");
const Router = require("./routes/routes");
// const pg = require("pg"); // not required here, only for db files
const { pool, dbConfig } = require("./db/pool");
const expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);
const passport = require("passport");
// const crypto = require("crypto"); // not required here, only for password utils

// Instantiate the app and load variables
const app = express();
require("dotenv").config();
require("./utils/passportUtils");

// Express configuration
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
// app.use("/", Router);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Set up session
const pgStore = expressSession({
  store: new pgSession({
    pool: pool,
    tableName: "session",
    conObject: dbConfig,
  }),
  secret: process.env.SOME_SECRET,
  resave: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
});

app.use(pgStore);

// Setup Passport Authentication
app.use(passport.initialize());
app.use(passport.session());

// Pass user to all middlewares
app.use(function (req, res, next) {
  if (req.user) {
    let pendingPromise = req.user;
    pendingPromise.then((user) => {
      res.locals.user = user;
    });
    res.locals.user = req.user;
  }

  next();
});

// Set up and import all routes
app.use(Router);

// Start app
const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
    throw error;
  }
  console.log(`Express app is listening on port ${PORT}!`);
});
