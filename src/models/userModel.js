const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
        set : (v)=> bcrypt.hashSync(v,bcrypt.genSaltSync(10))
    },
    address : {
        type : String,
    },
    img : {
        type : String,
    },
    role : {
        type : String,
        enum : ["admin","super-admin","user"],
        default : "user"
    }
},{
    timestamps:true,
    versionKey:false
});

const userModel = model("user",userSchema);

module.exports = userModel;