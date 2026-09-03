const express = require("express");
const app = express();
const PORT = 8080;
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

let posts =[
    {
        username : "saurav",
        content : "I love coding"
    },
    {
        username : "mayank",
        content : "smartwork is important to achieve success"
    },
    {
        username : "shivam",
        content : "Internship is going well!"
    }
];

app.get("/",(req,res)=>{
    res.redirect("/posts");
})

app.get("/posts",(req,res)=>{
    res.render("index",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new");
})

app.post("/posts",(req,res)=>{
    let {username, content} = req.body;
    posts.push({username, content});
    res.redirect("/posts");
})

app.listen(PORT, ()=>{
    console.log(`listening to PORT : ${PORT}`)
})