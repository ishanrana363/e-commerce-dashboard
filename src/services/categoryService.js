const categoryModel = require("../models/categoryModel");
const productModel = require("../models/productModel");
const deleteService = require("../commonService/deleteService");

const {parseUserToken} = require("../helpers/tokenHelper");
const mongoose = require("mongoose");
const checkAssociate = require("../commonService/cheackAssociate");



const categoryCreateService = async (req) => {
    const parseToken = parseUserToken(req);
    try {
        if (parseToken.role==="admin"){
            let reqBody = req.body;
            reqBody.userEmail = parseToken.email;
            let categoryData = await categoryModel.create(reqBody);
            return { status:"success",data:categoryData};
        }else {
            return {status:"fail",msg:"Permission not allowed"};
        }
    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
};

const categoryListService = async () => {
    try {
        let categoryData = await categoryModel.find();
        return {status:"success",data:categoryData};
    }catch (e){
        return {status:"fail",msg:e.toString()};
    }
};

const categoryUpdate = async (req) => {
    let parseToken = parseUserToken(req);
    try {
        let id = req.params.id;
        let filter = { _id : id };
        let reqBody = req.body;
        if (parseToken.role==="admin"){
            let data = await categoryModel.updateOne(filter,reqBody);
            return {status:"success",data : data};
        }else {
            return {status:"fail",msg:"Permission not granted"};
        }
    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
};

const categoryDeleteService = async (req) => {
    let parseToken = parseUserToken(req);
    try {
        let deleteId = new mongoose.Types.ObjectId(req.params.id);
        console.log(`delete id is ${deleteId}`);
        let checkProductModel = await checkAssociate({categoryID:deleteId},productModel);

        if (parseToken.role==="admin"){
            if (checkProductModel){
                return {
                    status:"fail",msg:"Associate with product model"
                };
            }else {
                let deleteData = await deleteService(req,categoryModel);
                return {status:"success",data:deleteData};
            }
        }else {
            return {status:"fail",msg:"Permission not granted"};
        }
    }catch (e) {
        console.log(e.toString());
        return {status:"fail",msg:e.toString()};
    }
};


const categoryListByAdmin = async (req)=>{
    let parseToken = parseUserToken(req);
    try {
        if (parseToken.role==="admin"){
            let data = await categoryModel.find();
            return {status:"success",data : data};
        }else {
            return {status:"fail", msg : "Permission not granted" };
        }
    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
}


module.exports ={
    categoryCreateService,
    categoryListService,
    categoryUpdate,
    categoryDeleteService,
    categoryListByAdmin
};