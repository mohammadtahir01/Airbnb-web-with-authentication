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
      type:String,
        default:"https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=1024x1024&w=0&k=20&c=z8_rWaI8x4zApNEEG9DnWlGXyDIXe-OmsAyQ5fGPVV8=",
        set:(v) => v === "" ? "https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=1024x1024&w=0&k=20&c=z8_rWaI8x4zApNEEG9DnWlGXyDIXe-OmsAyQ5fGPVV8=":v
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
