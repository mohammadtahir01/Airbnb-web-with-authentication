const express = require("express");
const route = express.Router({mergeParams: true});
const Reviewdata = require("../models/review.js")
const {reviewShema} = require("../schema.js")
const Listing = require("../models/listing.js")



const AysncWrap = require("../utils/asyncWrap.js");
const ExpressError = require("../utils/ExpressError.js");



const validShemaReview =(req,res,next)=>{
  let {error} = reviewShema.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, msg)
    }else{
        next()
    }
}

//reviews route
route.post("/", validShemaReview , AysncWrap( async(req,res)=>{
    let list1 = await Listing.findById(req.params.id);
    let newReview = new Reviewdata(req.body.review);

    list1.reviews.push(newReview);

    await newReview.save();
    await list1.save();

    console.log("Review has send");
    res.redirect(`/listings/${list1._id}`)
}))

// const finddata = async()=>{
//     let data = await Reviewdata.find({});
//     console.log(data);
// }
// finddata();

route.delete("/:reviewId", AysncWrap(async(req,res)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull : {reviews: reviewId}})
    await Reviewdata.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`)
}))

module.exports = route;