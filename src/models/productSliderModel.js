const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const productSliderSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    img : {
        type : String,
        required : true
    },
    productID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    userEmail : {
        type : String,
        required : true
    }
},{timestamps:true,versionKey:false});

const productSliderModel = model("productSliders",productSliderSchema);

module.exports = productSliderModel;