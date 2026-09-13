const Listing = require("./models/listing");
const Review = require('./models/review.js');
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema }  = require("./schema.js");


module.exports.isLoggedIn = (req,res,next)=>{
    // console.log(req.user);
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}


module.exports.isOwner = async(req,res,next)=>{
  let {id} = req.params
  let listing = await Listing.findById(id);
  if(!listing.owner._id.equals(res.locals.currUser._id)){
      req.flash("error", "You don't have permission to change");
      return res.redirect(`/listings/${id}`);
  }
  next();
}

// joi validation
module.exports.validateListing = (req,res,next)=>{
    let {error} =  listingSchema.validate(req.body)
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
       next(new ExpressError(400, errMsg))
    }
    next();
}

//joi validation
module.exports.validateReview = (req,res,next)=>{
  let {error} = reviewSchema.validate(req.body);
  if(error){
    let errorMsg = error.details.map((el)=> el.message).join(",");
    throw new ExpressError(400,errorMsg);
  }
  else{
    next();
  }
}