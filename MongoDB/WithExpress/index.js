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


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/amazon')
}


app.get("/",(req,res)=>{
    res.send("Home")
})


app.listen(PORT, ()=>{
    console.log(`Listening to PORT ${PORT}`)

    main()
    .then((res)=>{
        console.log("MongoDB Connected Successfully!")
    })
    .catch((err)=>{
        console.log("Error  : ", err.message)
    })
    
})