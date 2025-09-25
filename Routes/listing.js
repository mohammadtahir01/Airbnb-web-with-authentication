const express = require("express");
const router = express.Router();
// const Listing = require("../models/listing.js")
const {listingSchema} = require("../schema.js")
const {isLoggedIn} = require("../middleware.js")

const AysncWrap = require("../utils/asyncWrap.js");
const ExpressError = require("../utils/ExpressError.js");

const listController = require("../controllers/listingController.js");


const validateListing =(req,res,next)=>{
  let {error} = listingSchema.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, msg)
    }else{
        next()
    }
}

router
.route("/")
.get(AysncWrap(listController.index))
.post(
    validateListing,
    AysncWrap(listController.postForm)
);

// route.get("/",AysncWrap(listController.index))
//new Route

router.get("/new", isLoggedIn, listController.newForm)

router.route("/:id")
.get(AysncWrap(listController.show))
.put(validateListing, isLoggedIn, AysncWrap(listController.updatePost))
.delete(isLoggedIn, AysncWrap(listController.deletePost)
);

//show Route
// router.get("/:id",AysncWrap(listController.show))

//Create Route
// route.post("/", validateListing,AysncWrap(listController.postForm));

//edit post
router.get("/:id/edit", isLoggedIn, AysncWrap(listController.postEdit))

//update Post
// router.put("/:id", validateListing, isLoggedIn, AysncWrap(listController.updatePost)); 

//delete psot
// router.delete("/:id", isLoggedIn, AysncWrap(listController.deletePost));

module.exports = router;