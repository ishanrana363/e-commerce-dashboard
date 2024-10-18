const mongoose = require('mongoose');

const {Schema,model} = mongoose;

const featureSchema = new Schema({
    name : {
        type : String,
        required : [true, 'Feature name required']
    },
    description : {
        type : String,
        required : [true, 'Feature description required']
    },
    img : {
        type : String,
        required : true
    }
},{timestamps: true,versionKey:false});

const featureModel = model("feature", featureSchema);

module.exports = featureModel;