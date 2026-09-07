const express = require("express")
const app = express()
const PORT = 8080
const path = require("path")
const methodOverride = require("method-override")
const mongoose =  require("mongoose")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))

app.use(express.static(path.join(__dirname, "/public")))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride("_method"))

const mongodb_url = 'mongodb://127.0.0.1:27017/explora'
async function main() {
    await mongoose.connect(mongodb_url)
}
const connectToDB = ()=>{
    main().then(()=>console.log("Connected to MongoDB Successfully!"))
    .catch((err)=>console.log("Error : ", err))
}

app.get("/",(req,res)=>{
    res.send("home")
})

app.listen(PORT,()=>{
    console.log(`Listening to PORT ${PORT}`)
    connectToDB()
})