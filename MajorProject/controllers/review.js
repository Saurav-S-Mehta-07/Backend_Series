const Review = require("../models/review");
const Listing = require("../models/listing");


// add review route
module.exports.addReviewRoute = async(req,res)=>{
    let {id} = req.params
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    let listing = await Listing.findById(id);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "your review added");
    res.redirect(`/listings/${id}`);
}

// review delete route
module.exports.destroyReviewRoute = async(req,res)=>{
    let {id, review_id} = req.params;
    console.log(id, review_id);
    await Review.deleteOne({_id : review_id});
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: review_id } });
    req.flash("success", "your review deleted successfully")
    res.redirect(`/listings/${id}`);
}
