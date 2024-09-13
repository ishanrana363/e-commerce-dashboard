const productSliderModel = require("../models/productSliderModel");
const {parseUserToken} = require("../helpers/tokenHelper");
const mongoose = require("mongoose");



const productSliderCreateService = async (req) => {
    let parseToken = parseUserToken(req);
    try {
        if (parseToken.role==="admin"){
            let reqBody = req.body;
            reqBody.userEmail = parseToken.email;
            let data = await productSliderModel.create(reqBody);
            return {status:"success",data:data};
        }else {
            return {status:"fail",msg:"Permission not allowed"};
        }
    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
};

const productSliderUpdateService = async (req) => {
    let parseToken = parseUserToken(req);
    try {
        let id = new mongoose.Types.ObjectId(req.params.id);
        let filter = {_id : id};
        if (parseToken.role==="admin"){
            let reqBody = req.body;
            await productSliderModel.findByIdAndUpdate(filter,reqBody);
            return {status:"success",msg:"Slider update successfully"};
        }else {
            return {status:"fail",msg:"Permission not granted"};
        }
    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
};

const productSliderDeleteService = async (req)=>{
    let parseToken = parseUserToken(req);
    try {
        let id = new mongoose.Types.ObjectId(req.params.id);
        let filter = {_id: id};
        if (parseToken.role==="admin"){
            let data = await productSliderModel.findByIdAndDelete(filter);
            return { status:"success",data:data };
        }else {
            return {status:"fail",msg:"Permission not granted"};
        }
    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
};

const productSliderListService = async () =>{
    try {
        let data = await productSliderModel.find();
        return {status:"success",data:data};
    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
};


const productSliderListByAdmin = async (req)=>{
    let parseToken = parseUserToken(req);
    try {
        if (parseToken.role==="admin"){
            let data = await productSliderModel.find();
            return {status:"success",data:data};
        }else {
            return {status:"fail",msg:"Permission not allowed"};
        }
    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
};



module.exports = {
    productSliderCreateService,
    productSliderUpdateService,
    productSliderDeleteService,
    productSliderListService,
    productSliderListByAdmin
}