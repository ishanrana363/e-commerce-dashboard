const mongoose = require('mongoose');

const {Schema,model} = mongoose;

const brandSchema = new Schema({
    brandName : {
        type : String,
        required : [true, 'Brand name required']
    },
    brandImg : {
        type : String,
        required : [true, 'Brand image required']
    }
},{ timestamps: true,versionKey:false});

const brandModel = model("brand", brandSchema);

module.exports = brandModel;
