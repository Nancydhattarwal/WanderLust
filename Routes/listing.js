const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema,} = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({storage});

//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

//Index Route and Create Route
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,validateListing,upload.single("listing[image]"),wrapAsync(listingController.createListing)
);

//Show and Update and Delete Route
router
    .route("/:id")
    .get(wrapAsync(listingController.showListings))
    .put(isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing))
    .delete(isOwner,wrapAsync(listingController.destroyListing)
);

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));


module.exports = router;