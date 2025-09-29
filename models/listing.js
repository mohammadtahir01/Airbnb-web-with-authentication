const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./review.js")

const listingSchema = new Schema({
    title:{
     type:String,
     required:true,
    },
    description:String,
    image:{
      url:String,
      filename:String
    },
    price: Number,
    location: String,
    country: String,
    reviews:[
      {
        type:Schema.Types.ObjectId,
        ref:"Review"
      }
    ]
});
//if you delete hotel then it will be deteled all reviews
listingSchema.post("findOneAndDelete", async(data)=>{
  if(data){
    await Review.deleteMany({ _id: {$in: data.reviews}})
  }
})

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
