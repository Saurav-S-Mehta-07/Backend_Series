const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser("secretcode"));

app.get("/",(req,res)=>{
    res.send("I'm root");
})

app.get("/users",(req,res)=>{
    res.send("all users")
})

app.get("/setcookies",(req,res)=>{
    res.cookie("name", "saurav");
  res.send("sent you some cookies")
})

app.get("/getcookies",(req,res)=>{
    // console.dir(req.cookies);
    let {name = "user"} = req.cookies;
    res.send(`got the cookies => name : ${name}`);
})


app.get("/getsignedcookie",(req,res)=>{
    res.cookie("color", "red", {signed:true});
    res.send("done!");
})

// verify signed cookie
app.get("/verify",(req,res)=>{
    res.send(req.signedCookies);
})

app.listen(3000, ()=>{
    console.log("listening to port 3000");
})