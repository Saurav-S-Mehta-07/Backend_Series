const express = require("express");
const app = express();
const PORT = 8080;
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/",(req,res)=>{
    res.redirect("/posts");
})

app.get("/posts",(req,res)=>{
    res.send("get request in posts");
})

app.listen(PORT, ()=>{
    console.log(`listening to PORT : ${PORT}`)
})