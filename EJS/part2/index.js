const express = require("express");
const app  = express();
const PORT = 8080;
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));


app.get("/", (req, res)=>{
    res.send("HOME PAGE");
})

// app.get("/ig/:username",(req,res)=>{
//     const followers = ["adam", "bob", "charlie","dustibun", "eve"];
//     let {username} = req.params;
//     res.render("insta", {username, followers});
// })

app.get("/ig/:username",(req,res)=>{
    let {username} = req.params;
    const instgramData = require("./data.json");
    const data = instgramData[username];
    res.render("instagram", {data});
})

app.listen(PORT, ()=>{
    console.log(`Listening to PORT ${PORT}`);
})