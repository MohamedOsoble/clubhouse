const { Router } = require("express");
const postsController = require("../controllers/postsController");
const usersController = require("../controllers/usersController");
const membershipController = require("../controllers/membershipController");
const passport = require("passport");
const router = Router();
const validators = require("../utils/validators");

router.use(async function (req, res, next) {
  await req.user;
  next();
});

// Home & Post Routes
router.get("/", (req, res, next) => {
  res.render("index");
});
router.get("/view-posts", postsController.postsGet);
router.get("/create-post", postsController.getCreatePost);
router.post("/create-post", postsController.addNewPost);

// Login Routes
router.get("/login", usersController.loginGet);
router.get("/login-success", usersController.loginSuccess);
router.get("/login-failure", usersController.loginFailure);

// Logout
router.get("/logout", usersController.logoutGet);
router.get("/logout-success", usersController.logoutSuccess);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-failure",
    successRedirect: "/login-success",
  })
);

// Register Routes
router.get("/register", usersController.registerGet);
router.get("/register-success", usersController.registerSuccess);
router.post(
  "/register",
  validators.registrationValidator,
  usersController.registerPost
);

// Membership Routes
router.get("/view-membership", membershipController.viewMembership);
router.post("/update-membership", membershipController.updateMembership);

module.exports = router;
