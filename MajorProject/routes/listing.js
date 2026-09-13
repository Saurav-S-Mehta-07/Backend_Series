const express = require("express");
const router = express.Router()
const Listing = require("../models/listing");
const {listingSchema} = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js");

const {isLoggedIn, validateListing} = require("../middleware.js");

// Index Route
router.get("/",wrapAsync(async(req,res)=>{
    let allListings = await Listing.find()
    res.render("listings/index.ejs",{allListings})
}))


// New Route
router.get("/new",isLoggedIn,(req,res)=>{
    res.render("listings/new.ejs");
})

//Create Route
router.post("/",isLoggedIn, validateListing ,wrapAsync(async(req,res,next)=>{
    let listing = req.body.listing
    let newListing = new Listing(listing)
    await newListing.save()
    req.flash("success", "New Listing Created!");
    res.redirect("/listings")
}))

// Show Route
router.get("/:id",wrapAsync( async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id).populate("reviews");
    if(!listing){
        req.flash("error", "Listing you requested for does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
}))


//edit route
router.get("/:id/edit",isLoggedIn,wrapAsync(async(req,res)=>{
    let {id} = req.params
    let listing = await Listing.findById(id)
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing})
}))

// update route
router.put("/:id",isLoggedIn,validateListing,wrapAsync(async(req,res)=>{
    let {id} = req.params
    let listing = req.body.listing
    if(!listing){
        throw new ExpressError(400, "Send valid data for listing")
    }
    await Listing.findByIdAndUpdate(id, listing, {runValidators : true})
    req.flash("success", "listing updated!");
    res.redirect(`/listings/${id}`);
}))

// destroy route
router.delete("/:id",isLoggedIn,wrapAsync(async(req,res)=>{
    let {id} = req.params
    await Listing.findByIdAndDelete(id);
    req.flash("success", "listing deleted successfully!");
    res.redirect("/listings")
}))

module.exports = router;