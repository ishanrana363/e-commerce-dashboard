const cartModel = require("../models/cartModel");
const {parseUserToken} = require("../helpers/tokenHelper");
const mongoose = require("mongoose");

const cartCreateService = async (req) => {
    let parseToken = parseUserToken(req);
    try {
        let userId = new mongoose.Types.ObjectId(parseToken.userId);
        let reqBody = req.body;
        reqBody.userID = userId;
        let data = await cartModel.create(reqBody);
        return {status:"success",data:data};
    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
};


const cartDeleteService = async (req) => {
    let parseToken = parseUserToken(req);
    try {
        let cartId = new mongoose.Types.ObjectId(req.params.id);
        let filter = { _id : cartId, userID : parseToken.userId };
        await cartModel.findByIdAndDelete(filter);
        return { status:"success", msg:"Cart item delete successfully" };
    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
};


const categoryDetailsService = async (req) => {
    let parseToken = parseUserToken(req);
    try {
        let userId = new mongoose.Types.ObjectId(parseToken.userId);
        let cartId = new mongoose.Types.ObjectId(req.params.id);
        let matchStage = { $match : { userID : userId, _id : cartId } };

        let joinWithProductId = {
            $lookup : {
                from : "products" , localField:"productID", foreignField:"_id", as:"product"
            }
        };

        let joinWithBrandId = {
            $lookup: {
                from: "brands", localField: "product.brandID", foreignField: "_id", as: "brand"
            }
        };

        let joinWithCategoryId = {
            $lookup : {
                from :"categories", localField:"product.categoryID", foreignField:"_id", as:"category"
            }
        };

        let unwindProductId = { $unwind : "$product" };
        const unwindBrandId = { $unwind: "$brand" };
        const unwindCategoryId = { $unwind : "$category" };

        let data = await cartModel.aggregate([
            matchStage,joinWithProductId,joinWithBrandId,joinWithCategoryId,unwindProductId,unwindBrandId,unwindCategoryId
        ]);

        return {status:"success",data:data};

    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
};


module.exports = {
    cartCreateService,
    cartDeleteService,
    categoryDetailsService
}