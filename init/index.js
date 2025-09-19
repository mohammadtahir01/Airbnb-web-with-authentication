const mongoose = require("mongoose");
const alldata = require("./data.js")
const Listingdata = require("../models/listing.js");

main().then(()=>{
    console.log("Connected to MongoDB");
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

let initDB = async()=>{
    await Listingdata.deleteMany({});
    await Listingdata.insertMany(alldata.data)
    console.log("data was initialized")
};
initDB().then((err)=>{
    console.log(err)
}).catch(()=>{
    console.log("there is no error!")
});