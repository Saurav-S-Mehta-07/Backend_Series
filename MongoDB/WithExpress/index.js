const express = require("express")
const app = express()
const path = require("path")
const methodOverride = require("method-override")
const PORT = 8080

const mongoose = require("mongoose")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname,"/views"))

app.use(express.static(path.join(__dirname, "/public")))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride("_method"))

const Chat = require("./models/Chat.js")
const { resourceLimits } = require("worker_threads")

const ExpressError = require("./ExpressError.js");
const asyncWrap = require("./WrapAsync.js");


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp')
}


app.get("/",(req,res)=>{
    res.redirect('/chats')
})

app.get("/chats",asyncWrap(async(req,res)=>{
    let chats = await Chat.find();
    let date = chats[0].created_at
    res.render("index",{chats})
}))

app.get("/chats/new",(req,res)=>{
    // throw new ExpressError(404, "Page not found") //trying handler in non-async function
    res.render("new")
})

app.post("/chats",asyncWrap(async(req,res,next)=>{
    let {from, to, msg} = req.body;
    let created_at = new Date();
    let newChat = {from:from, to:to, msg:msg, created_at:created_at}
    let result = await Chat.insertOne(newChat)
    res.redirect("/chats")
}))

app.get("/chats/:id/edit", asyncWrap(async(req,res)=>{
    let {id} = req.params
    let chat = await Chat.findById(id)
    res.render("edit", {chat})
}))



//show route
// app.get("/chats/:id",async(req,res,next)=>{
//         let {id} = req.params;
//         let chat = await Chat.findById(id)
//         // if(!chat){
//         //     throw new ExpressError(404, "chat not found") //trying handler in async function -> but express bydefault not call next
//         // }
//         if (!chat){ //even try but chat can be undefine if cast error id long then try will handle
//           return  next(new ExpressError(404, "Chat not found")) // explicitly call next and now handler work
//         }
//         res.render("show.ejs",{chat})
// })

// app.get("/chats/:id",async(req,res,next)=>{
//     try{
//         let {id} = req.params;
//         let chat = await Chat.findById(id)
//         if (!chat){ 
//           return  next(new ExpressError(404, "Chat not found"))
//         }
//         res.render("show.ejs",{chat})
//     }
//     catch(err){
//         next(err)
//     }
// })

app.get("/chats/:id",asyncWrap(async(req,res,next)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id)
    if (!chat){ 
        return  next(new ExpressError(404, "Chat not found")) 
    }
    res.render("show.ejs",{chat})
}))

app.patch("/chats/:id",asyncWrap(async(req,res)=>{
    let {id} = req.params
    let {msg} = req.body;
    let updatedChat = {msg:msg, created_at: new Date()}
    let result = await Chat.findByIdAndUpdate(id, updatedChat, {runValidators:true})
    res.redirect("/chats")
}))


app.delete("/chats/:id", asyncWrap(async(req,res)=>{
    let {id} = req.params
    let result = await Chat.findByIdAndDelete(id);
    res.redirect("/chats")
}))


const handleValidationErr = (err)=>{
    console.log("this was a validation error please follow rules");
    console.log(err.message);
    return err;
}

// error handling middleware

app.use((err,req,res,next)=>{
    console.log(err.name);
    if(err.name == "ValidationError"){
      err =  handleValidationErr(err)
    }
    next(err)
})
app.use((err,req,res,next)=>{
    let {status=500, message="some error occurred"} = err;
    res.status(status).send(message);
})


const connectToDB = ()=>{
    main()
    .then((res)=>{
        console.log("MongoDB Connected Successfully!")
    })
    .catch((err)=>{
        console.log("Error  : ", err.message)
    })
}


app.listen(PORT, ()=>{
    console.log(`Listening to PORT ${PORT}`)
    connectToDB()
})