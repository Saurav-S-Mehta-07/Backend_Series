const express = require("express");
const app = express();
const PORT = 8080;


app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/register",(req,res)=>{
    let {username, password} = req.query;
    res.send(`Standard Get Request. Welcome! ${username}`);
})

app.post("/register",(req,res)=>{
    let {username, password} = req.body;
    res.send(`Standard Post Request. Welcome! ${username}`);
})

app.listen(PORT,()=>{
    console.log(`listening to PORT : ${PORT}`);
})