const express = require("express")
const router = express.Router()

router.get("/signup", (req,res)=>{
    res.render("users/signup");
})

router.get("/login",(req,res)=>{
    res.render("users/login");
})


module.exports = router