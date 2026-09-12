const express = require("express");
const router = express.Router()

// user's
router.get("/",(req,res)=>{
    res.send("get for users");
})

router.get("/:id",(req,res)=>{
    res.send("get for show user")
})

router.post("/",(req,res)=>{
    res.send("post for user")
})

router.delete("/:id",(req,res)=>{
    res.send("delete for user")
})

module.exports = router;