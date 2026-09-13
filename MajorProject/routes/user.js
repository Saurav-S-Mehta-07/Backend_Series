const express = require("express")
const router = express.Router()

const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");

router.get("/signup", (req,res)=>{
    res.render("users/signup");
})

router.post("/signup",wrapAsync(async(req,res)=>{
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email, username});

        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.flash("success","Welcome to wanderlust");
        res.redirect("/listings")
    }
    catch(err){
       req.flash("error",err.message);
       res.redirect("/signup");
    }
}));

router.get("/login",(req,res)=>{
    res.render("users/login");
})

router.get("/logout", (req,res)=>{
    res.redirect("/listings");
})

module.exports = router