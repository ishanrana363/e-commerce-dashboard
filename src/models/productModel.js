const mongoose = require("mongoose");
const {model,Schema} = mongoose;

const productSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    short_des : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    discount : {
        type : Boolean,
        required : true
    },
    discount_price : {
        type : Number,
        required : true
    },
    img : {
        type : String,
        required : true
    },
    star : {
        type : String,
        required : true
    },
    stock : {
        type : Boolean,
        required : true
    },
    remark : {
        type : String,
        required : true
    },
    categoryID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    brandID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    userEmail : {
        type : String,
    }
},{ timestamps : true, versionKey : false });

const productModels = model("products",productSchema);

module.exports = productModels;