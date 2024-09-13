const {registrationService,loginService,profileReadService,
    profileUpdateService,profileDetailsService,allProfileDataServices
} = require("../services/userService");


exports.registrationController = async (req,res) =>{
    let result = await registrationService(req);
    res.status(201).send(result);
};


exports.loginController = async (req,res) =>{
    let result = await loginService(req);
    res.status(200).send(result);
};


exports.profileDetailsController = async (req,res) =>{
    let result = await profileReadService(req);
    res.status(200).send(result);
};


exports.profileUpdateController = async (req,res) =>{
    let result = await profileUpdateService(req);
    res.status(200).send(result);
};


exports.profileDeleteController = async (req,res) =>{
    let result = await profileDetailsService(req);
    res.status(200).send(result);
};


exports.allProfileDataController = async (req,res) =>{
    let result = await allProfileDataServices(req);
    res.status(200).send(result);
};


