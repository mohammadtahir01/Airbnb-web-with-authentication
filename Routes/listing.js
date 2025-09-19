const express = require("express");
const route = express.Router();
const Listing = require("../models/listing.js")
const {listingSchema} = require("../schema.js")

const AysncWrap = require("../utils/asyncWrap.js");
const ExpressError = require("../utils/ExpressError.js");


const validateListing =(req,res,next)=>{
  let {error} = listingSchema.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, msg)
    }else{
        next()
    }
}

route.get("/", 
    // validateListing,
    AysncWrap(async(req,res)=>{
    let allListing = await Listing.find({});
    console.log(allListing)
    res.render("list/index.ejs", {allListing})
}))
//new Route
route.get("/new", (req,res)=>{
   res.render("list/new.ejs")
})

//show Route
route.get("/:id", 
    // validateListing,
     AysncWrap(async(req,res)=>{
    let {id} = req.params;
    let listingId = await Listing.findById(id).populate("reviews");
    if(!listingId){
        throw new ExpressError(404, "Listing not found!");
    }
    res.render("list/show.ejs", {listingId})
}))

//Create Route
route.post("/", 
    validateListing,
    AysncWrap(async(req,res,next)=>{
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    console.log(newListing)
    res.redirect("/listings")  
}));

route.get("/:id/edit", 
    // validateListing,
    AysncWrap(async(req,res)=>{
    let {id} = req.params;
    // console.log("inside creation",{id});
    let listingEdit = await Listing.findById(id);
    if(!listingEdit){
        throw new ExpressError(404, "Listing not found for edit!");
    }
    console.log(listingEdit)
    res.render("list/edit.ejs", {listingEdit})
}))
route.put("/:id",
    validateListing,
    AysncWrap(async (req, res) => {
    let { id } = req.params;
    let updated = await Listing.findByIdAndUpdate(id, req.body.listing, { runValidators: true, new: true });
     if(!updated){
        throw new ExpressError(404, "Cannot update, listing not found!");
    }
    res.redirect("/listings");
})); 

route.delete("/:id",
    // validateListing,
    AysncWrap(async(req,res)=>{
    let { id } = req.params;
    console.log(id)
    let data = await Listing.findByIdAndDelete(id)
    if(!data){
       throw new ExpressError(404, "Cannot delete, listing not found!");
    }
    console.log("deleted  data",data)
    res.redirect("/listings");  
    // res.send(id)
}))

module.exports = route;