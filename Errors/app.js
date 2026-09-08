const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("home route");
});

app.get("/error", (req, res) => {
    abcd = abcd;
});

// Error-handling middleware MUST be last
app.use((err, req, res, next) => {
    console.log("-----------------error----------");
    next(err);
});


app.use((err,req,res,next)=>{
    console.log("-------2nd error handler------");
    next(err);
})

// app.use((req,res)=>{
//     res.send("page not found")
// })

app.listen(8080, () => {
    console.log("Listening to port 8080");
});