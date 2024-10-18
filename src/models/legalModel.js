const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const legalSchema = new Schema({
    description:{
        type:String,
        required:[true,"Description is required"]
    },
    type : {
        type:String,
        required:[true,"Type is required"]
    }
},{timestamps: true,versionKey:false});

const legalModel = model("legal",legalSchema);

module.exports = legalModel;