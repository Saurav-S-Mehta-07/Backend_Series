const express = require("express");
const router = express.Router()
const Listing = require("../models/listing");
const {listingSchema} = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js");

// joi validation
const validateListing = (req,res,next)=>{
    let {error} =  listingSchema.validate(req.body)
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
       next(new ExpressError(400, errMsg))
    }
    next();
}

// Index Route
router.get("/",wrapAsync(async(req,res)=>{
    let allListings = await Listing.find()
    res.render("listings/index.ejs",{allListings})
}))


// New Route
router.get("/new",(req,res)=>{
    res.render("listings/new.ejs");
})

//Create Route
router.post("/", validateListing ,wrapAsync(async(req,res,next)=>{
    let listing = req.body.listing
    let newListing = new Listing(listing)
    await newListing.save()
    res.redirect("/listings")
}))

// Show Route
router.get("/:id",wrapAsync( async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", {listing});
}))


//edit route
router.get("/:id/edit",wrapAsync(async(req,res)=>{
    let {id} = req.params
    let listing = await Listing.findById(id)
    res.render("listings/edit.ejs",{listing})
}))

// update route
router.put("/:id",validateListing,wrapAsync(async(req,res)=>{
    let {id} = req.params
    let listing = req.body.listing
    if(!listing){
        throw new ExpressError(400, "Send valid data for listing")
    }
    await Listing.findByIdAndUpdate(id, listing, {runValidators : true})
    res.redirect(`/listings/${id}`);
}))

// destroy route
router.delete("/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings")
}))

module.exports = router;