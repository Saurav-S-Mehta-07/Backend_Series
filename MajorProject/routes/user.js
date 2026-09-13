const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirectUrl } = require("../middleware.js");
const { signup, loginForm, signupForm, login, logout } = require("../controllers/user.js");
const passport = require("passport")


router.route("/signup")
.get(signupForm)
.post(wrapAsync(signup));

router.route("/login")
.get(loginForm)
.post(saveRedirectUrl, 
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    login
);

router.get("/logout", logout);

module.exports = router;
