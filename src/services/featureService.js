const featureModel = require("../models/featureModel");
const {parseUserToken} = require("../helpers/tokenHelper");


const featureService = async (req) => {
    let parseToken = parseUserToken(req);
    try {
        let reqBody = req.body;
        if (parseToken.role==="admin"){
            let data = await featureModel.create(reqBody);
            return {status:"success",data:data};
        }else {
            return {status:"fail",msg:"Permission not granted"};
        }
    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
};

const featureList = async () => {
    try {
        let data = await featureModel.find();
        return {status:"success",data:data};
    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
};

const featureUpdateService = async (req) => {
    let parseToken = parseUserToken(req);
    try {
        let id = req.params.id;
        let filter = {_id : id};
        let reqBody = req.body;
        if (parseToken.role==="admin"){
            await featureModel.findByIdAndUpdate(filter,reqBody);
            return {status:"success",msg:"update successfully"};
        }else {
            return {status:"fail",msg:"Permission not allowed"};
        }
    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
};

const featureDeleteService = async (req) => {
    let parseToken = parseUserToken(req);
    try {
        let id = req.params.id;
        let filter = {_id : id};
        if (parseToken.role==="admin"){
            let data = await featureModel.findByIdAndDelete(filter);
            return {status:"success",data:data};
        }else {
            return {status:"fail",msg:"Permission not allowed"};
        }
    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
};


module.exports = {
    featureService,
    featureList,
    featureUpdateService,
    featureDeleteService
};