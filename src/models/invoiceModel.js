const mongoose = require("mongoose");
const {model,Schema} = mongoose;

const invoiceSchema = new Schema({
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    payble : {
        type : Number,
        required : true
    },
    cus_details : {
        type : String,
        required : true
    },
    ship_details : {
        type : String,
        required : true
    },
    tran_id : {
        type : Number,
        required : true
    },
    valid_id : {
        type : String,
        required : true
    },
    delivery_status:{
        type : String,
        required : true
    },
    payment_status:{
        type : String,
        required : true
    },
    vat : {
        type : String,
        required : true
    },
    delivery_charge : {
        type : String,
        required : true
    },
    total : {
        type : Number,
        required : true
    }
},{timestamps:true,versionKey:false});


const invoiceModel = model("invoices",invoiceSchema);

module.exports = invoiceModel;