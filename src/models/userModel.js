const mongoose = require("mongoose");

const {Schema,model} = mongoose;


const userSchema = new Schema({
    name : {
        type : String,
        require : [true, 'User name required']
    },
    email : {
        type : String,
        required : [true,"Email required"] ,
        unique : true
    },
    phone : {
        type : String,
        required : [true,"Phone number required"],
        unique : true,
    },
    password : {
        type : String,
        required: [true,"Password required"],
        set : 
    }
},{
    timestamps:true,
    versionKey:false
});

const userModel = model("user",userSchema);

module.exports = userModel;