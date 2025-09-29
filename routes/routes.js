const { Router } = require("express");
const controller = require("../controllers/appController");
const passport = require("passport");
const router = Router();

router.use(async function (req, res, next) {
  console.log(await req.user);
  next();
});

router.get("/", controller.homeGet);
router.get("/view-posts", controller.postsGet);
router.get("/register", controller.registerGet);

// Login Routes
router.get("/login", controller.loginGet);
router.get("/login-success", controller.loginSuccess);
router.get("/login-failure", controller.loginFailure);

// Logout
router.get("/logout", controller.logoutGet);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-failure",
    successRedirect: "/login-success",
  })
);
router.post("/register", controller.registerPost);
module.exports = router;
