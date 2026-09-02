const express = require("express");
const app = express();
const path = require("path");
const PORT = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/",(req,res)=>{
    // res.send("Home page");
    res.render("home.ejs"); // res.render("home")
})

app.get("/hello",(req,res)=>{
    res.send("Hello");
})

app.get("/rolldice",(req,res)=>{
    let diceVal = Math.floor(Math.random()*6 + 1);
    res.render("rolldice",{diceVal});
})


app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`);
})