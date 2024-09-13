const wishModel = require("../models/wishModel");
const {parseUserToken} = require("../helpers/tokenHelper");
const mongoose = require("mongoose");


const wishCreateService = async (req) => {
    let parseToken = parseUserToken(req);
    try {
        let userId = parseToken.userId;
        let reqBody = req.body;
        reqBody.userID = userId;
        let data = await wishModel.create(reqBody);
        return {status:"success",data:data};
    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
};

const wishDeleteService = async (req) => {
    let parseToken = parseUserToken(req);
    try {
        let wishId = new mongoose.Types.ObjectId(req.params.id);
        let filter = { _id : wishId, userID : parseToken.userId };
        await wishModel.findByIdAndDelete(filter);
        return {status:"success", msg : "Wish delete successfully" };

    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
};


const wishDetailsService = async (req) => {
    let parseToken = parseUserToken(req);
  try {
      let userId = new mongoose.Types.ObjectId(parseToken.userId);
      let wishId = new mongoose.Types.ObjectId(req.params.id);
      let matchStage = { $match : { _id : wishId , userID : userId } };

      let joinWithProductId = { $lookup : {
          from : "products" , localField : "productID",foreignField:"_id",as:"product"
      } };

      let joinWithBrandId = {
          $lookup: {
              from: "brands", localField: "product.brandID", foreignField: "_id", as: "brand"
          }
      };

      let joinWithCategoryId = {
          $lookup : {
              from:"categories", localField:"product.categoryID", foreignField:"_id",as:"category"
          }
      };

      const unwindProductId = {$unwind : "$product"};
      const unwindBrandId = {$unwind: "$brand"};
      const unwindCategoryId = {$unwind : "$category"};

      let data = await wishModel.aggregate([
          matchStage,joinWithProductId,joinWithBrandId,joinWithCategoryId,unwindProductId,unwindBrandId,unwindCategoryId
      ]);

      return {status:"success",data:data};

  }catch (e) {
      return {status:"fail",msg:e.toString()};
  }
}


module.exports = {
    wishCreateService,
    wishDeleteService,
    wishDetailsService
}