const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const accessTokenKey = process.env.JWT_KEY; 
const {tokenCreate} = require("../helper/tokenHelper")

class authClass {
    signIn = async (req, res) => {
        try {
            let { email, password } = req.body;
    
            let userData = await userModel.findOne({ email: email });

            if(!userData) return res.status(404).json({
                status:"fail",
                msg : "user not exists in this email"
            });

            let matchPassword = await bcrypt.compare(password,userData.password);
            if(!matchPassword)return res.status(403).json({
                status:'fail',
                msg : 'password not match'
            });            
            
            // create access token

            const token = tokenCreate (
                {userData},
                accessTokenKey,
                "10d"
            );

            
            return res.status(200).json({
                status: "success",
                msg: "Sign-in successful",
                token : token
            });
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "fail",
                msg: error.toString()
            });
        }
    };
}

const authController = new authClass();

module.exports = authController;