const mongoose = require("mongoose");

const {Schema,model} = mongoose;


const profileSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email: {
        type: String,
        validate: {
            validator: function(v) {
                return /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
        required: [true, 'User email required'],
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true
    },
    cus_add : {
        type : String,required:true
    },
    cus_city : {
        type : String, required : true
    },
    cus_country : {
        type : String, required : true
    },
    cus_fax : {
        type : String, required : true
    },
    cus_name : {
        type : String, required : true
    },
    cus_phone : {
        type : String, required : true
    },
    cus_postcode : {
        type :String, required : true
    },
    cus_state : {
        type : String, required : true
    },
    ship_add : {
        type : String, required:true
    },
    ship_city : {
        type : String, required : true
    },
    ship_country : {
        type : String, required : true
    },
    ship_name : {
        type : String, required : true
    },
    ship_phone : {
        type : String, required : true
    },
    ship_postcode : {
        type : String, required : true
    },
    ship_state : {
        type : String, required : true
    }
},{timestamps:true,versionKey:false});


const profileModel = model("profiles",profileSchema);


module.exports = profileModel;
