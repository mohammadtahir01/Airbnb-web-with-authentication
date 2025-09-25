const User = require("../models/user.js");


const createSignup = (req,res)=>{
    res.render("users/signup.ejs");
};

const postSignup = async(req,res)=>{
   let alldata = await User.find({});
    console.log(alldata)
   try{
    let {username,email,password} = req.body;
    let newUser = new User({username,email});
    let alldata = await User.register(newUser,password);
    console.log(alldata);
    req.login(alldata, (err)=>{
      if(err){
        return next(err);
      }
       req.flash('sucess', 'login sucessfly');
       res.redirect("/listings"); 
    });
   }catch(e){
    req.flash('error', e.message);
    res.redirect("/signup");
   }
};

const createLogin = (req,res)=>{
  res.render("users/login.ejs");
}

const checkLogin = async(req,res)=>{
  req.flash('sucess', 'login sucessfly');
  res.redirect("/listings")
};

const userLogout = (req,res,next)=>{
  req.logout((err)=>{
    if(err){
      next(err);
    }
    req.flash("sucess", "You are Logged out!");
    res.redirect("/listings");
  })
};


module.exports ={
    createSignup,
    postSignup,
    createLogin,
    checkLogin,
    userLogout,
}