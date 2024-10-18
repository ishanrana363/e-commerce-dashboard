const mongoose = require('mongoose');

const {Schema,model} = mongoose;

const productSliderSchema = new Schema({
    title : {
        type : String,
        required : [true, 'Title is required']
    },
    des : {
        type : String,
        required : [true, 'Description is required']
    },
    price : {
        type : Number,
        required : [true, 'Price is required']
    },
    image : {
        type : String,
        required : [true, 'Image is required']
    },
    productID : {
        type : Schema.Types.ObjectId,
        ref : 'Product'
    }
},{timestamps:true,versionKey:false});

const productSliderModel = model("productSlider", productSliderSchema);

module.exports = productSliderModel;