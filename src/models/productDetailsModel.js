const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const productSchema = new Schema({
    img : {
        type : String,
        required : true
    },
    img1 : {
        type : String,
        required : true
    },
    img2 : {
        type : String,
        required : true
    },
    img3 : {
        type : String,
        required : true
    },
    img4 : {
        type : String,
        required : true
    },
    img5 : {
        type : String,
        required : true
    },
    img6 :{
        type : String,
    },
    img7 : {
        type : String,
    },
    img8 : {
        type : String,
    },
    des : {
        type : String,
        required : true
    },
    color : {
        type : String,
        required : true
    },
    size : {
        type : String,
        required : true
    },
    productID : {
        type : mongoose.Schema.Types.ObjectId
    }

},{timestamps:true,versionKey:false});

const productDetailsModel = model('Product',productSchema);

module.exports = productDetailsModel;