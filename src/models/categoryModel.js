const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const categorySchema = new Schema({
    categoryName : {
        type : String,
        required : [true, 'Category name required']
    },
    categoryImg : {
        type : String,
        required : [true, 'Category image required']
    }
},{timestamps:true,versionKey:false});

const categoryModel = model('category', categorySchema);

module.exports = categoryModel;