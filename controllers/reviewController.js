const Listing = require("../models/listing.js")
const Reviewdata = require("../models/review.js")


const reviewPost = async(req,res)=>{
    let list1 = await Listing.findById(req.params.id);
    let newReview = new Reviewdata(req.body.review);

    list1.reviews.push(newReview);

    await newReview.save();
    await list1.save();

    console.log("Review has send");
    res.redirect(`/listings/${list1._id}`)
};

const reviewDelete = async(req,res)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull : {reviews: reviewId}})
    await Reviewdata.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`)
}

module.exports = {
    reviewPost,
    reviewDelete,
}