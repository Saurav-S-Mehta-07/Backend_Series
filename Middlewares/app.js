const express = require("express")
const app = express();


//middleware

//words for all path
// app.use(()=>{
//     console.log("hi, I'm a middleware")
// })

// app.use((req,res)=>{
//     let {q} = req.query
//     console.log(q)
//     console.log("hi, I'm a middleware");
//     res.send("bye");
// })


// app.use((req,res,next)=>{
//     console.log("I'm a middleware for all")
//     next()
// })

// app.use((req,res,next)=>{
//     console.log("I'm an another middleware for all")
//     next()
// })

// app.get("/",(req,res)=>{
//     res.send("HI! I'm home root")
// })



// utility middleware example
// logger
// app.use((req,res,next)=>{
//     req.time = new Date().toString();
//     console.log(req.method, req.hostname, req.path, req.time);
//     next()
// })


// this middleware run for all routes as previous
// app.use("/",(req,res,next)=>{
//     console.log("I'm only / route but I'll run for all")
//     next()
// })

// // this middleware for specific path /random and /random/anything
// app.use("/random",(req,res,next)=>{
//     console.log("I'm only for random")
//     next()
// })


// one way to write to middleware
// app.use("/api",(req,res,next)=>{
//     let {token} = req.query
//     if(token==="access123"){
//        return next();
//     }
//     res.send("access denied");
// })

// app.get("/api",checkToken,(req,res)=>{
//     res.send("welcome! these APIs is for free") 
// })


// second way to write middleware
const checkToken = (req,res,next)=>{
    let {token} = req.query
    if(token==="access123"){
       return next();
    }
    res.send("access denied");
}

const isLoggedIn = (req,res,next)=>{
    let {login} = req.query
    if(login==="saurav"){
       return next();
    }
    res.send("access denied");
}

app.get("/api",checkToken,isLoggedIn,(req,res)=>{
    res.send("welcome! these APIs is for free") 
})

app.get("/",(req,res)=>{
    res.send("I'm a home route")
})

app.get("/random",(req,res)=>{
    res.send("This is a random page")
})

app.use((req,res)=>{
    res.status(404).send("Page not found");
});


app.listen(8080, ()=>{
    console.log("Listening to port 8080");
})