const express = require("express");
const app = express();
const mongoose = require('mongoose');
// const Listing = require("./models/listing.js")
// const Reviewdata = require("./models/review.js")
const overRide = require("method-override")
const route = require("./Routes/listing.js");
const review1 = require("./Routes/review.js");
const session = require("express-session");
const flash = require("connect-flash");


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

const sessionOption = {
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly:true,
    },
}
app.use(session(sessionOption));
app.use(flash());

app.get("/", (req,res)=>{
    res.send("Hello World");
})

app.use((req,res,next)=>{
  res.locals.sucess = req.flash('sucess');
  res.locals.error = req.flash('error');
  next();
})

app.use("/listings",route);
app.use("/listings/:id/review",review1)

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
