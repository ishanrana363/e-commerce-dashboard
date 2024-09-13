const mongoose = require("mongoose");
const {model,Schema} = mongoose;

const cartSchema = new Schema({
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    productID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    color : {
        type : String,
        required : true
    },
    qty : {
        type : Number,
        required : true
    },
    size : {
        type : String,
        required : true
    }
},{timestamps:true,versionKey:false});

const cartModel = model("carts",cartSchema);


module.exports = cartModel;