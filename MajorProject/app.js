const express = require("express")
const app = express()
const PORT = 8080
const path = require("path")
const methodOverride = require("method-override")
const mongoose =  require("mongoose")
const ejsMate = require("ejs-mate")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))

app.use(express.static(path.join(__dirname, "/public")))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride("_method"))
app.engine("ejs", ejsMate)


const Listing = require("./models/listing")
const Review = require("./models/review");

const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js")

const listingSchema = require("./schema.js");


// connection to DB
const mongodb_url = 'mongodb://127.0.0.1:27017/explora'
async function main() {
    await mongoose.connect(mongodb_url)
}
const connectToDB = ()=>{
    main().then(()=>console.log("Connected to MongoDB Successfully!"))
    .catch((err)=>console.log("Error : ", err))
}

const validateListing = (req,res,next)=>{
    let {error} =  listingSchema.validate(req.body)
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
       next(new ExpressError(400, errMsg))
    }
    next();
}


// our Routes
app.get("/",(req,res)=>{
    res.redirect("/listings")
})


// Index Route
app.get("/listings",wrapAsync(async(req,res)=>{
    let allListings = await Listing.find()
    res.render("listings/index.ejs",{allListings})
}))


// New Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})

//Create Route
app.post("/listings", validateListing ,wrapAsync(async(req,res,next)=>{
    let listing = req.body.listing
    let newListing = new Listing(listing)
    await newListing.save()
    res.redirect("/listings")
}))

// Show Route
app.get("/listings/:id",wrapAsync( async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", {listing});
}))


//edit route
app.get("/listings/:id/edit",wrapAsync(async(req,res)=>{
    let {id} = req.params
    let listing = await Listing.findById(id)
    res.render("listings/edit.ejs",{listing})
}))

// update route
app.put("/listings/:id",validateListing,wrapAsync(async(req,res)=>{
    let {id} = req.params
    let listing = req.body.listing
    if(!listing){
        throw new ExpressError(400, "Send valid data for listing")
    }
    await Listing.findByIdAndUpdate(id, listing, {runValidators : true})
    res.redirect(`/listings/${id}`);
}))

// destroy route
app.delete("/listings/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings")
}))


// add review route
app.post("/listings/:id/reviews",wrapAsync(async(req,res)=>{
    let {id} = req.params
    let newReview = new Review(req.body.review);
    let listing = await Listing.findById(id);
    
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${id}`);
}))

// review delete route
app.delete("/listings/:id/reviews/:review_id", wrapAsync(async(req,res)=>{
    let {id, review_id} = req.params;
    console.log(id, review_id);
    await Review.deleteOne({_id : review_id});
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: review_id } });
    res.redirect(`/listings/${id}`);
}))

app.use((req,res,next)=>{
    next(new ExpressError(404, "Page not Found"))
})

app.use((err,req,res,next)=>{
    let {status = 500, message = "something went wrong"} = err
    res.status(status).render("error.ejs",{err});
    // res.status(status).send(message)
})

app.listen(PORT,()=>{
    console.log(`Listening to PORT ${PORT}`)
    connectToDB()
})