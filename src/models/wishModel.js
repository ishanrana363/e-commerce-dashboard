const mongoose = require("mongoose");
const {Schema,model} = mongoose;

let wishSchema = new Schema({
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    productID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    }
},{timestamps:true,versionKey:false});


const wishModel = model("wishes",wishSchema);


module.exports = wishModel;