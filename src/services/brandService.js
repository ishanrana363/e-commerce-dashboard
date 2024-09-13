const brandModel = require("../models/brandModel");
const productModel = require("../models/productModel");
const checkAssociate = require("../commonService/cheackAssociate");
const {parseUserToken} = require("../helpers/tokenHelper");
const deleteService = require("../commonService/deleteService");
const mongoose = require("mongoose");


const brandCreateService = async (req) => {
    const parseToken = parseUserToken(req);
    try {
        if (parseToken.role==="admin"){
            let reqBody = req.body;
            reqBody.userEmail = parseToken.email;
            let data = await brandModel.create(reqBody);
            return {status:"success",data : data};
        }else {
            return {status:"fail",msg:"Permission not granted"};
        }
    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
};

const brandListService = async () => {
    try {
        let data = await brandModel.find();
        return {status:"success",data:data};
    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
};

const brandUpdateService = async (req) => {
    const parseToken = parseUserToken(req);
    try {
        let id = req.params.id;
        let filter = {
            _id : id
        };
        let reqBody = req.body;
        if (parseToken.role==="admin"){
            let data = await brandModel.findByIdAndUpdate(filter,reqBody);
            return {status:"success",data:data};
        }else {
            return {status:"fail",msg:"Permission not allowed"};
        }
    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
};

const brandDeleteService = async (req) => {
    let parseToken = parseUserToken(req);
    try {
        let deleteId = new mongoose.Types.ObjectId(req.params.id);
        if (parseToken.role==="admin"){
            let associateWithProductModel = await checkAssociate({brandID:deleteId},productModel);
            if (associateWithProductModel){
                return {status:"fail",msg:"Associate with product id"};
            }else {
                let data = await deleteService(req,brandModel);
                return {status:"success",data:data};
            }
        }else {
            return {status:"fail",msg:"Permission not granted "};
        }

    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
};


const brandListByAdminService = async (req) => {
    let parseToken = parseUserToken(req);
    try {
        if (parseToken.role==="admin"){
            let data = await brandModel.find();
            return {status:"success",data:data};
        }else {
            return {status:"fail",msg:"Permission not granted"};
        }
    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
};



module.exports = {
    brandCreateService,
    brandListService,
    brandUpdateService,
    brandDeleteService,
    brandListByAdminService
};