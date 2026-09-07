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


const Listing = require("./models/listing")


// connection to DB
const mongodb_url = 'mongodb://127.0.0.1:27017/explora'
async function main() {
    await mongoose.connect(mongodb_url)
}
const connectToDB = ()=>{
    main().then(()=>console.log("Connected to MongoDB Successfully!"))
    .catch((err)=>console.log("Error : ", err))
}


// our Routes
app.get("/",(req,res)=>{
    res.redirect("/listings")
})


// Index Route
app.get("/listings",async(req,res)=>{
    let allListings = await Listing.find()
    res.render("listings/index.ejs",{allListings})
})


// New Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})

//Create Route
app.post("/listings",async(req,res)=>{
    let listing = req.body.listing
    await Listing.insertOne(listing)
    res.redirect("/listings")
})

// Show Route
app.get("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
})


//edit route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id} = req.params
    let listing = await Listing.findById(id)
    res.render("listings/edit.ejs",{listing})
})

// update route
app.put("/listings/:id",async(req,res)=>{
    let {id} = req.params
    let listing = req.body.listing
    await Listing.findByIdAndUpdate(id, listing, {runValidators : true})
    res.redirect(`/listings/${id}`);
})

// destroy route
app.delete("/listings/:id",async(req,res)=>{
    let {id} = req.params
    await Listing.findByIdAndDelete(id)
    res.redirect("/listings")
})

app.listen(PORT,()=>{
    console.log(`Listening to PORT ${PORT}`)
    connectToDB()
})