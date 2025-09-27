if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}
console.log(process.env.SECRET_KEY) 

const express = require("express");
const app = express();
const mongoose = require('mongoose');
// const Listing = require("./models/listing.js")
// const Reviewdata = require("./models/review.js")
const overRide = require("method-override")

const listingRoute = require("./Routes/listing.js");
const reviewRoute = require("./Routes/review.js");
const userRoute = require("./Routes/user.js");


const session = require("express-session");
const flash = require("connect-flash");

const passport = require("passport");
const PassportLocal = require("passport-local");
const User = require("./models/user.js");


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
app.use(passport.initialize());
app.use(passport.session());
passport.use(new PassportLocal(User.authenticate()));

passport.serializeUser(User.serializeUser());//user se related jo v information store krate h session me use serializeUser kahte h 
passport.deserializeUser(User.deserializeUser());//user se related jo v information unstore krate h session se use deserializeUser kahte h
app.get("/", (req,res)=>{
    res.send("Hello World");
})

app.use((req,res,next)=>{
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.CurrentUser = req.user;
  next();
})


// app.get("/demo", async(req,res)=>{
//   const existingUser = await User.findOne({ username: "Tahir" });
//   console.log(existingUser)
//   if(existingUser){
//     return res.send("User already exists!");
//   }

//   let fake = new User({
//     email:"tahir0121@gamil.com",
//     username:"Tahir",
//   });

//   let alldata = await User.register(fake, "tahir786");
//   res.send(alldata);
// });


app.use("/listings",listingRoute);
app.use("/listings/:id/review",reviewRoute)
app.use("/",userRoute);


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
