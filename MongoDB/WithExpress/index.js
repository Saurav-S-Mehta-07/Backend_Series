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


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp')
}


app.get("/",(req,res)=>{
    res.redirect('/chats')
})

app.get("/chats",async(req,res)=>{
    let chats = await Chat.find();
    let date = chats[0].created_at
    res.render("index",{chats})
})

app.get("/chats/new",(req,res)=>{
    res.render("new")
})

app.post("/chats",async(req,res)=>{
    let {from, to, msg} = req.body;
    let created_at = new Date();
    let newChat = {from:from, to:to, msg:msg, created_at:created_at}
    let result = await Chat.insertOne(newChat)
    res.redirect("/chats")
})


app.get("/chats/:id/edit", async(req,res)=>{
    let {id} = req.params
    let chat = await Chat.findById(id)
    console.log(chat)
    res.render("edit", {chat})
})

app.get("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id)
    res.render("show.ejs",{chat})
})

app.patch("/chats/:id",async(req,res)=>{
    let {id} = req.params
    let {msg} = req.body;
    let updatedChat = {msg:msg, created_at: new Date()}
    let result = await Chat.findByIdAndUpdate(id, updatedChat, {runValidators:true})
    res.redirect("/chats")
})



app.delete("/chats/:id", async(req,res)=>{
    let {id} = req.params

    let result = await Chat.findByIdAndDelete(id);
    console.log(result, "this chat is deleted successfully")
    res.redirect("/chats")
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