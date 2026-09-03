const express = require("express");
const app = express();
const PORT = 8080;
const path = require("path");
const methodOverride = require('method-override')

const { v4: uuidv4 } = require('uuid');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(methodOverride('_method'));

let posts =[
    {
        id : "1a",
        username : "saurav",
        content : "I love coding"
    },
    {
        id : "2b",
        username : "mayank",
        content : "smartwork is important to achieve success"
    },
    {
        id : "3c",
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
    let id  = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((post)=> id === post.id);
    res.render("show.ejs", {post});
})

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((post)=> id === post.id);
    post.content = newContent;
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((post)=> id === post.id);
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id", (req,res)=>{
    let {id} = req.params;
    posts = posts.filter((post)=>id!==post.id);
    res.redirect("/posts");
})

app.listen(PORT, ()=>{
    console.log(`listening to PORT : ${PORT}`)
})