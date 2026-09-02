const express = require("express");
const app = express();
const PORT = 8080;

app.set("view engine", "ejs");

app.get("/",(req,res)=>{
    // res.send("Home page");
    res.render("home.ejs"); // res.render("home")
})


app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`);
})