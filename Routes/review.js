const express = require("express");
const route = express.Router({mergeParams: true});
const Reviewdata = require("../models/review.js")
const {reviewShema} = require("../schema.js")



const AysncWrap = require("../utils/asyncWrap.js");
const ExpressError = require("../utils/ExpressError.js");

const reviewController = require("../controllers/reviewController.js");



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
route.post("/", validShemaReview , AysncWrap(reviewController.reviewPost))

// const finddata = async()=>{
//     let data = await Reviewdata.find({});
//     console.log(data);
// }
// finddata();

route.delete("/:reviewId", AysncWrap(reviewController.reviewDelete));

module.exports = route;