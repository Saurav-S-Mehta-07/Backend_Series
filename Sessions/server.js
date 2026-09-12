const express = require("express")
const app  = express();
const flash = require('connect-flash');

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"/views"));

const session = require("express-session")

const sessionOpion = {secret: 'mysupersecretkey',resave : false,saveUninitialized : true,}
app.use(session(sessionOpion))
app.use(flash());


app.get("/",(req,res)=>{
    res.send("it is a root page")
})


app.get("/register",(req,res)=>{
    let {name="anonymous"} = req.query;
    req.session.name = name;
    console.log(req.session.name);
    req.flash("success",`hi ${name}`)
    res.redirect("/hello");
})

app.get("/hello",(req,res)=>{
    // res.render("index",{name : req.session.name, msg : req.flash("success")})

    res.locals.msg = req.flash("success");
    res.render("index", {name : req.session.name});
})


//**********************************
// app.get("/reqcount",(req,res)=>{
//     req.session.count  = req.session.count?req.session.count+1:1;
//     res.send(`You sent a request ${req.session.count} times`);
// })

// app.get("/test",(req,res)=>{
//     res.send("test successful");
// })

app.listen(3000, (req,res)=>{
    console.log("listening to port 3000")
})