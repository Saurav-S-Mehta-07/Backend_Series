const express = require("express")
const app = express()
const path = require("path")
const methodOverride = require("method-override")
const PORT = 8080

app.set("view engine", "ejs")
app.set("views", path.join(__dirname,"/views"))

app.use(express.static(path.join(__dirname, "/public")))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride("_method"))


app.get("/",(req,res)=>{
    res.send("Home")
})


app.listen(PORT, ()=>{
    console.log(`Listening to PORT ${PORT}`)
})