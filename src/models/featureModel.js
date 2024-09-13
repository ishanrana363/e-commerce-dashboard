const mongoose = require("mongoose");
const {model,Schema} = mongoose;

const featureSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    img : {
        type : String,
        required : true
    }
},{timestamps : true, versionKey : false});


const featureModel = model("features",featureSchema);

module.exports = featureModel;