const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");


app.use("/api",(req,res,next)=>{
    let {token} = req.query;
    if(token === "access123"){
        return next();
    }
    throw new ExpressError(401, "Access Denied");
})

app.get("/", (req, res) => {
    res.send("home route");
});

app.get("/api",(req,res)=>{
    res.send("data")
})

app.get("/error", (req, res) => {
    abcd = abcd;
});

app.use((err, req, res, next) => {
    console.log("-----------------error----------");
    res.send(err);
});

app.use((req,res)=>{
    res.send("page not found")
})

app.listen(8080, () => {
    console.log("Listening to port 8080");
});