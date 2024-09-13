const mongoose = require("mongoose");
const {Schema,model} = mongoose;
const productDetailsSchema = new Schema({
    des : {
        type : String,
        required : true
    },
    color : {
        type : String,
        required : true
    },
    userEmail : {
        type : String,
        required : true
    },
    img1 : {
        type : String,
        required : true,
    },
    img2 : {
        type : String,
        required : true,
    },
    img3 : {
        type : String,
        required : true,
    },
    img4 : {
        type : String,
        required : true,
    },
    img5 : {
        type : String,
        required : true,
    },
    img6 : {
        type : String,
        required : true,
    },
    img7 : {
        type : String,
        required : true,
    },
    img8 : {
        type : String,
        required : true,
    },
    img9 : {
        type : String,
        required : true,
    },
    img10 : {
        type : String,
        required : true,
    },
        productID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    }

},{ timestamps : true,versionKey:false });

const productDetailsModel = model("productDetails",productDetailsSchema);

module.exports = productDetailsModel;
