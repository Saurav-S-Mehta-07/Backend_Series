const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirectUrl } = require("../middleware.js");
const { signup, loginForm, signupForm, login, logout } = require("../controllers/user.js");
const passport = require("passport")


router.get("/signup", signupForm);
router.post("/signup",wrapAsync(signup));
router.get("/login", loginForm);
router.post("/login",
    saveRedirectUrl, 
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    login
);
router.get("/logout", logout);

module.exports = router;
