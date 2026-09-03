const express = require("express");
const app = express();
const PORT = 8080;

app.get("/register",(req,res)=>{
    res.send("standard get response");
})

app.post("/register",(req,res)=>{
    res.send("Standard post response");
})

app.listen(PORT,()=>{
    console.log(`listening to PORT : ${PORT}`);
})