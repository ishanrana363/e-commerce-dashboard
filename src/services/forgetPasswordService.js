const otpModel = require("../models/otpModel");
const profileModel = require("../models/profileModele");
const sendEmailUtility = require("../helpers/emailHelper");


const sendOtoService = async (req) => {
    try {
        let email = req.params.email;

        let otpCode =  Math.floor(100000+ Math.random()*999999);

        let emailSubject = "otp code";

        let emailText = ` Your otp code is ${otpCode} `;

        let filter = { email: email };

        let user = await profileModel.findOne(filter);


        if(user){
            await sendEmailUtility(email,emailText,emailSubject);
            await otpModel.findOneAndUpdate({email},{$set:{otp:otpCode}},{upsert:true});
            return {status:"success", msg : "6 digit otp send successfully" };
        }else{
            return {status:"fail",msg:"User not found"};
        }
    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
};


module.exports = {
    sendOtoService
}