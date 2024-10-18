const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const productSchema = new Schema({

    title : {
        type : String,
        required : [true,"Title is required"]
    },
    shortDes : {
        type : String,
        required : [true,"Short description is required"]
    },
    price : {
        type : Number,
        required : [true,"Price is required"]
    },
    discount : {
        type : Boolean,
    },
    discountPrice : {
        type : Number,
    },
    image : {
        type : String,
        required : [true,"Image is required"]
    },
    star : {
        type : String,
    },
    stock : {
        type : String,
        required : [true,"Stock is required"]
    },
    remark : {
        type : String,
        required : [true,"Remark is required"]
    },
    categoryID : {
        type : Schema.Types.ObjectId,
        ref : "category",
        required : [true,"Category ID is required"]
    },
    brandID : {
        type : Schema.Types.ObjectId,
        ref : "brand",
        required : [true,"Brand ID is required"]
    }

},{timestamps:true,versionKey:false,});

const productModel = model("product",productSchema);

module.exports = productModel;