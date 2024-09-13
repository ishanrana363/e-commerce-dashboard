const {cartCreateService,cartDeleteService,categoryDetailsService} = require("../services/addToCartService");


exports.cartCreateController = async (req,res)=>{
    let result = await cartCreateService(req);
    res.status(201).send(result)
};


exports.cartRemoveController = async (req,res)=>{
    let result = await cartDeleteService(req);
    res.status(200).send(result);
};


exports.cartDetailsController = async (req,res)=>{
    let result = await categoryDetailsService(req);
    res.status(200).send(result);
};