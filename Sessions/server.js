const express = require("express")
const app  = express();

const session = require("express-session")

app.use(session({
  secret: 'mysupersecretkey',
  resave : false,
  saveUninitialized : true,
  
}))


app.get("/",(req,res)=>{
    res.send("it is a root page")
})

app.get("/register",(req,res)=>{
    let {name="anonymous"} = req.query;
    req.session.name = name;
    console.log(req.session.name);
    res.redirect("/hello");
})

app.get("/hello",(req,res)=>{
    res.send(`hello ${req.session.name}`)
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