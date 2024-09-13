const mongoose = require("mongoose");
const {Schema,model} = mongoose;


const invoiceProductSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    invoiceId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    qty : {
        type  : Number,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    color : {
        type : String,
        required : true
    },
    size : {
        type : String,
        required : true
    }
},{timestamps:true,versionKey:false});


const invoiceProductModel = model("invoiceProducts",invoiceProductSchema);


module.exports = invoiceProductModel;
