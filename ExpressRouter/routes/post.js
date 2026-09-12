const express = require("express")
const router = express.Router()


// post's

router.get("/",(req,res)=>{
    res.send("get for posts");
})

router.get("/:id",(req,res)=>{
    res.send("get for show post")
})

router.post("/",(req,res)=>{
    res.send("post for post")
})

router.delete("/:id",(req,res)=>{
    res.send("delete for post")
})

module.exports = router