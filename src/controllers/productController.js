const parentModel = require("../models/productModel");
const childModel = require("../models/productDetailsModel");
const createParentChildCreation = require("../commonService/createParentChildService");
const {parseUserToken} = require("../helpers/tokenHelper");
const {productReviewDetailsService,productUpdateService,
    productDetailsService,productByRemarkListService,productReviewCreateService}
    = require("../services/productService");
const categoryJoinService = require("../commonService/categoryJoinService");
const joinBrandService = require("../commonService/joinBrandService");



 exports.productProductDetailsCreateController = async (req,res) => {
    let parseToken = parseUserToken(req);
    try {
        if (parseToken.role==="admin"){
            let data = await createParentChildCreation(req,parentModel,childModel,"productID");
            res.status(201).send(data);
        }else {
            res.status(403).send({status:"fail",msg:"Permission not allowed"});
        }
    }catch (e) {
        res.status(500).send({status:"fail",msg:e.toString()});
    }
};


 exports.productListByBrandId = async (req,res)=>{
     let joinWithBrandId = {
         $lookup : {
             from : "brands" , localField:"brandID",foreignField: "_id",as:"brand"
         }
     };


     let joinWithCategoryId = {
         $lookup : {
             from : "categories" , localField:"categoryID",foreignField: "_id",as:"category"
         }
     };

     let searchValue = { "$regex": req.params.searchValue , "$options": "i" };

     let searchArray = [
         { title : searchValue },{ price : searchValue }
     ];


     let result = await joinBrandService(req,parentModel,searchArray,joinWithBrandId,joinWithCategoryId,);
     res.status(200).send(result);
 };


 exports.productListByCategoryId = async (req,res)=>{
     let joinWithBrandId = {
         $lookup : {
             from : "brands" , localField:"brandID",foreignField: "_id",as:"brand"
         }
     };


     let joinWithCategoryId = {
         $lookup : {
             from : "categories" , localField:"categoryID",foreignField: "_id",as:"category"
         }
     };

     let searchKeyword = { "$regex" : req.params.searchValue , "$options" : "i" }

     let searchArray = [
         { title : searchKeyword },{ price : searchKeyword }
     ];

     let result = await categoryJoinService(req,parentModel,searchArray,joinWithBrandId,joinWithCategoryId);
     res.status(200).send(result);
 };


 exports.productUpdateController = async (req,res)=>{
     let result = await productUpdateService(req);
     res.status(200).send(result);
 };



exports.productDetailsController = async (req,res)=>{
    let result = await productDetailsService(req);
    res.status(200).send(result);
};


exports.productListByRemark = async (req,res)=>{
    let result = await productByRemarkListService(req);
    res.status(200).send(result);
};


exports.productReviewController = async (req,res)=>{
    let result = await productReviewCreateService(req);
    res.status(200).send(result);
};


exports.productReviewDetailsController = async (req,res)=>{
    let result = await productReviewDetailsService(req);
    res.status(200).send(result);
};
