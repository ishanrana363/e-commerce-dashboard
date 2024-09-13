const {productSliderCreateService,productSliderUpdateService,productSliderDeleteService,
    productSliderListService,productSliderListByAdmin}
    = require("../services/productSliderService");

exports.productSliderCreateController = async (req,res)=>{
    let result = await productSliderCreateService(req);
    res.status(201).send(result);
};


exports.productSliderUpdateController = async (req,res)=>{
    let result = await productSliderUpdateService(req);
    res.status(200).send(result);
};


exports.productSliderDeleteController = async (req,res)=>{
    let result = await productSliderDeleteService(req);
    res.status(200).send(result);
};


exports.productSliderListController = async (req,res)=>{
    let result = await productSliderListService(req);
    res.status(200).send(result);
};


exports.productSliderListByAdminController = async (req,res)=>{
    let result = await productSliderListByAdmin(req);
    res.status(200).send(result);
};