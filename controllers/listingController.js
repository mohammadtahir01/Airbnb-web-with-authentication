const Listing = require("../models/listing.js")

const index = async(req,res)=>{
    let allListing = await Listing.find({});
    res.render("list/index.ejs", {allListing})
};

const newForm = (req,res)=>{
   res.render("list/new.ejs")
}

const show = async(req,res)=>{
    let {id} = req.params;
    let listingId = await Listing.findById(id).populate("reviews");
    if(!listingId){
        throw new ExpressError(404, "Listing not found!");
    }
    res.render("list/show.ejs", {listingId})
};

// const postForm=async(req,res,next)=>{
//     let url = req.file.path;
//     let filename = req.file.filename;
//     console.log(url, "....", filename);
//     let newListing = new Listing(req.body.listing);
//     newListing.image = {url,filename};
//     await newListing.save();
//     // console.log(newListing)
//     req.flash('success', 'Login successfull!')
//     res.redirect("/listings")  
// }


const postForm = async (req, res, next) => {
    if (!req.file) {
        throw new ExpressError(400, "Image upload failed!");
    }
    // Cloudinary se aata hai
    let url = req.file.path || req.file.secure_url;  
    let filename = req.file.filename;

    console.log("Uploaded file:", req.file);

    let newListing = new Listing(req.body.listing);
    newListing.image = { url, filename };
    await newListing.save();

    req.flash('success', 'Listing created successfully!');
    res.redirect("/listings");
};


const postEdit = async(req,res)=>{
    let {id} = req.params;
    // console.log("inside creation",{id});
    let listingEdit = await Listing.findById(id);
    if(!listingEdit){
        throw new ExpressError(404, "Listing not found for edit!");
    }
    // console.log(listingEdit)
    res.render("list/edit.ejs", {listingEdit})
};

const updatePost = async (req, res) => {
    let { id } = req.params;
    let updated = await Listing.findByIdAndUpdate(id, req.body.listing, { runValidators: true, new: true });
     if(!updated){
        throw new ExpressError(404, "Cannot update, listing not found!");
    }
     if (req.file) {
        updated.image = {
            url: req.file.path || req.file.secure_url,
            filename: req.file.filename
        };
        await updated.save();
    }
    req.flash("success", "Listing updated successfully!");
     res.redirect(`/listings/${updated._id}`);
};

const deletePost = async(req,res)=>{
    let { id } = req.params;
    // console.log(id)
    let data = await Listing.findByIdAndDelete(id)
    if(!data){
       throw new ExpressError(404, "Cannot delete, listing not found!");
    }
    // console.log("deleted  data",data)
    req.flash('success', 'Listing Deleted!')
    res.redirect("/listings");  
    // res.send(id)
};

const SearchPage1 = async(req,res)=>{
//   console.log(req.body);
//   res.send("ok");
  let {country} = req.body;
  let countryData = await Listing.find({country});
//   console.log(countryData);
  res.render("list/index.ejs", { allListing: countryData });
}

module.exports ={
    index,
    newForm,
    show,
    postForm,
    postEdit,
    updatePost,
    deletePost,
    SearchPage1,
};
