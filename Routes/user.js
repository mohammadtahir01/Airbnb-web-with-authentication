const express = require("express");
const route = express.Router();
const User = require("../models/user.js");
const AysncWrap = require("../utils/asyncWrap.js");
const passport = require("passport");

route.get("/signup", (req,res)=>{
    res.render("users/signup.ejs");
});

route.post("/signup", AysncWrap(async(req,res)=>{
   let alldata = await User.find({});
    console.log(alldata)
   try{
    let {username,email,password} = req.body;
    let newUser = new User({username,email});
    let alldata = await User.register(newUser,password);
    console.log(alldata);
    req.flash('sucess', 'login sucessfly');
    res.redirect("/listings"); 
   }catch(e){
    req.flash('error', e.message);
    res.redirect("/signup");
   }
}));

route.get("/login" ,(req,res)=>{
  res.render("users/login.ejs");
});

route.post("/login",
  passport.authenticate("local",{
  failureRedirect:"/login", 
  failureFlash:true}),async(req,res)=>{
  req.flash('sucess', 'login sucessfly');
  res.redirect("/listings")
})

module.exports = route;