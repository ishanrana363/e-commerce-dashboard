const {sendOtoService} = require("../services/forgetPasswordService");


exports.sendOtpController = async (req,res)=>{
    let result = await sendOtoService(req);
    res.status(201).send(result);
};