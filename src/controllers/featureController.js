const {featureService,featureList,featureUpdateService,featureDeleteService} = require("../services/featureService");


exports.featureCreateService = async (req,res)=>{
    let result = await featureService(req);
    res.status(201).send(result);
};


exports.featureListController = async (req,res)=>{
    let result = await featureList();
    res.status(200).send(result);
};


exports.featureUpdateController = async (req,res)=>{
    let result = await featureUpdateService(req);
    res.status(200).send(result);
};


exports.featureDeleteController = async (req,res)=>{
    let result = await featureDeleteService(req);
    res.status(200).send(result);
}