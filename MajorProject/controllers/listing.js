const Listing = require("../models/listing");


// Index Route
module.exports.indexRoute = async(req,res)=>{
    let allListings = await Listing.find()
    res.render("listings/index.ejs",{allListings})
}

// New Route
module.exports.newRoute = (req,res)=>{
    res.render("listings/new.ejs");
}

//Create Route
module.exports.createRoute = async(req,res,next)=>{
    let listing = req.body.listing
    listing.owner = req.user._id;
    let newListing = new Listing(listing)
    await newListing.save()
    req.flash("success", "New Listing Created!");
    res.redirect("/listings")
}

// Show Route
module.exports.showRoute = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id).populate({path : "reviews", populate : {path : "author"}}).populate("owner");
    if(!listing){
        req.flash("error", "Listing you requested for does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
}


//edit route
module.exports.editRoute = async(req,res)=>{
    let {id} = req.params
    let listing = await Listing.findById(id)
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing})
}

// update route
module.exports.updateRoute = async(req,res)=>{
    let {id} = req.params
    await Listing.findByIdAndUpdate(id, req.body.listing, {runValidators : true})
    req.flash("success", "listing updated!");
    res.redirect(`/listings/${id}`);
}

// destroy route
module.exports.destroyRoute = async(req,res)=>{
    let {id} = req.params
    await Listing.findByIdAndDelete(id);
    req.flash("success", "listing deleted successfully!");
    res.redirect("/listings")
}
