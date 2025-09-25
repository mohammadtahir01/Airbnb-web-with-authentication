const express = require("express");
const route = express.Router();
const User = require("../models/user.js");
const AysncWrap = require("../utils/asyncWrap.js");
const passport = require("passport");
const userController = require("../controllers/userController.js");

route.get("/signup", userController.createSignup);

route.post("/signup", AysncWrap(userController.postSignup));

route.get("/login" ,userController.createLogin);

route.post("/login",passport.authenticate("local",{
  failureRedirect:"/login", 
  failureFlash:true}), userController.checkLogin);

route.get("/logout", userController.userLogout)

module.exports = route;