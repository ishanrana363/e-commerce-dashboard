const { brandCreateService,brandListService,brandUpdateService,brandDeleteService,brandListByAdminService }
    = require("../services/brandService");


exports.brandCreateController = async (req,res) => {
    let result = await brandCreateService(req);
    res.status(201).send(result);
};


exports.brandListController = async (req,res)=>{
    let result = await brandListService();
    res.status(200).send(result);
};


exports.brandUpdateController = async (req,res)=>{
    let result = await brandUpdateService(req);
    res.status(200).send(result);
};


exports.brandDeleteController = async (req,res)=>{
    let result = await brandDeleteService(req);
    res.status(200).send(result);
};


exports.brandListByAdminController = async (req,res)=>{
    let result = await brandListByAdminService(req);
    res.status(200).send(result)
};

