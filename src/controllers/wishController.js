const {wishCreateService,wishDeleteService,wishDetailsService} = require("../services/wishService");



exports.wishCreateController = async (req,res)=>{
    let result = await wishCreateService(req);
    res.status(201).send(result);
};


exports.wishDeleteService = async (req,res)=>{
    let result = await wishDeleteService(req);
    res.status(200).send(result);
};


exports.wishDetailsController = async (req,res)=>{
    let result = await wishDetailsService(req);
    res.status(200).send(result);
};