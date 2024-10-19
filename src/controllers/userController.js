const userModel = require("../models/userModel");

class userClass {
    signUp = async (req,res)=>{
        try {
            let {name,email,phone,password,address} = req.body;
            let emailExists = await userModel.findOne({email:email});
            if(emailExists) return res.status(409).json({
                status : "fail",
                msg : "User email already exists"
            });
            let reqBody = {
                name : name,
                email : email,
                phone : phone,
                password : password,
                address : address
            };
            let data = await userModel.create(reqBody);
            return res.status(201).json({
                status : "success",
                msg : "user sign successfully",
                data : data
            });
        } catch (error) {
            return res.status(500).json({
                status : "fail",
                msg : error.toString()
            });
        }
    };
}

const userController = new userClass();

module.exports = userController;