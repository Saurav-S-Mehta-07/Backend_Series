const express = require("express")
const router = express.Router({mergeParams:true})
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn,validateReview, isReviewAuthor} = require("../middleware.js");
const { addReviewRoute, destroyReviewRoute } = require("../controllers/review.js");

// add review route
router.post("/",isLoggedIn, validateReview, wrapAsync(addReviewRoute))
// review delete route
router.delete("/:review_id",isLoggedIn,isReviewAuthor, wrapAsync(destroyReviewRoute))

module.exports = router;