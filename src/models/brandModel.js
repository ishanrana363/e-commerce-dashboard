const mongoose = require("mongoose");

const {Schema,model} = mongoose;


const brandSchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    img : {
        type : String,
        required : true
    },
    userEmail : {
        type : String,
        required : true
    }
},{timestamps:true,versionKey:false});

const brandModel = model("brands",brandSchema);

module.exports = brandModel;