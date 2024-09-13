const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const reviewSchema = new Schema({
    productID:{
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    des : {
        type : String,
    },
    rating : {
        type : String
    }
},{timestamps:true,versionKey:false});


const reviewModel = model("reviews",reviewSchema);

module.exports = reviewModel;