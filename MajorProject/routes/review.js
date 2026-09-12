const express = require("express")
const router = express.Router({mergeParams:true})
const Review = require("../models/review");
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");


//joi validation
const validateReview = (req,res,next)=>{
  let {error} = reviewSchema.validate(req.body);
  if(error){
    let errorMsg = error.details.map((el)=> el.message).join(",");
    throw new ExpressError(400,errorMsg);
  }
  else{
    next();
  }
}


// add review route
router.post("/", validateReview, wrapAsync(async(req,res)=>{
    let {id} = req.params
    let newReview = new Review(req.body.review);
    let listing = await Listing.findById(id);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "your review added");
    res.redirect(`/listings/${id}`);
}))

// review delete route
router.delete("/:review_id", wrapAsync(async(req,res)=>{
    let {id, review_id} = req.params;
    console.log(id, review_id);
    await Review.deleteOne({_id : review_id});
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: review_id } });
    req.flash("success", "your review deleted successfully")
    res.redirect(`/listings/${id}`);
}))

module.exports = router;