const express = require("express");
const router = express.Router()
const wrapAsync = require("../utils/wrapAsync.js")
const {isLoggedIn, validateListing, isOwner} = require("../middleware.js");
const { indexRoute, newRoute, createRoute, showRoute, editRoute, updateRoute, destroyRoute } = require("../controllers/listing.js");

router.get("/",wrapAsync(indexRoute))
router.get("/new",isLoggedIn, newRoute);
router.post("/",isLoggedIn, validateListing ,wrapAsync(createRoute));
router.get("/:id",wrapAsync(showRoute))
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(editRoute))
router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(updateRoute))
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(destroyRoute))

module.exports = router;