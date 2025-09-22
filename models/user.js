const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userShemamongoose = require("passport-local-mongoose");


const userShema = new Schema({
    email:{
        type:String,
        required:true,
    },
});

userShema.plugin(userShemamongoose);//it generates automatic user name, passport and hasing salt thats why we are using as a plugin and also it does authenticate user login or not
module.exports = mongoose.model('User', userShema);