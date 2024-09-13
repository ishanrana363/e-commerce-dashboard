const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const paymentSettingSchema = new Schema({
    store_id : {
        type : String,
    },
    store_password : {
        type : String
    },
    currency : {
        type : String
    },
    init_url : {
        type : String
    },
    success_url : {
        type : String
    },
    fail_url : {
        type : String
    },
    cancel_url : {
        type : String
    },
    ipn_url : {
        type : String
    }

},{timestamps:true,versionKey:false});

const paymentSettingModel = model("paymentSettings",paymentSettingSchema);

module.exports = paymentSettingModel;