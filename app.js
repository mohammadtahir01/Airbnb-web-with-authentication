const express = require("express");
const app = express();
const mongoose = require('mongoose');
// const Listing = require("./models/listing.js")
// const Reviewdata = require("./models/review.js")
const overRide = require("method-override")
const route = require("./Routes/listing.js");
const review1 = require("./Routes/review.js");


// const {listingSchema,reviewShema} = require("./schema.js")

const path = require("path");
const ejsMate = require("ejs-mate");
//error
// const AysncWrap = require("./utils/asyncWrap.js");
const ExpressError = require("./utils/ExpressError.js");

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}))
app.use(overRide("_method"))
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")))

main().then(()=>{
    console.log("Connected to MongoDB");
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

app.use("/listings",route);
app.use("/listings/:id/review",review1)


// const validShemaReview =(req,res,next)=>{
//   let {error} = reviewShema.validate(req.body)
//     if(error){
//         const msg = error.details.map(el => el.message).join(",");
//         throw new ExpressError(400, msg)
//     }else{
//         next()
//     }
// }

app.get("/", (req,res)=>{
    res.send("Hello World");
})

//reviews route
// app.post("/listings/:id/review", validShemaReview , AysncWrap( async(req,res)=>{
//     let list1 = await Listing.findById(req.params.id);
//     let newReview = new Reviewdata(req.body.review);

//     list1.reviews.push(newReview);

//     await newReview.save();
//     await list1.save();

//     console.log("Review has send");
//     res.redirect(`/listings/${list1._id}`)
// }))

// const finddata = async()=>{
//     let data = await Reviewdata.find({});
//     console.log(data);
// }
// finddata();

// app.delete("/listings/:id/review/:reviewId", AysncWrap(async(req,res)=>{
//     let {id,reviewId} = req.params;
//     await Listing.findByIdAndUpdate(id, {$pull : {reviews: reviewId}})
//     await Reviewdata.findByIdAndDelete(reviewId);
//     res.redirect(`/listings/${id}`)
// }))

app.use((req,res,next)=>{
  next(new ExpressError(404,"page not found!"))
})

app.use((err,req,res,next)=>{
 let {statusCode = 500, message = "something went wrong!"} = err;
 res.status(statusCode).render("error.ejs",{message})
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})
