const express = require("express");
const router = express.Router()
const wrapAsync = require("../utils/wrapAsync.js")
const {isLoggedIn, validateListing, isOwner} = require("../middleware.js");
const { indexRoute, newRoute, createRoute, showRoute, editRoute, updateRoute, destroyRoute } = require("../controllers/listing.js");

router.route("/")
.get(wrapAsync(indexRoute))
.post(isLoggedIn, validateListing ,wrapAsync(createRoute));

router.get("/new",isLoggedIn, newRoute)

router.route("/:id")
.get(wrapAsync(showRoute))
.put(isLoggedIn,isOwner,validateListing,wrapAsync(updateRoute))
.delete(isLoggedIn,isOwner,wrapAsync(destroyRoute))

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(editRoute))

module.exports = router;