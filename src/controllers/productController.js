const productModel = require("../models/productModel");
const productDetailsModel = require("../models/productDetailsModel");
const checkAssociate = require("../services/checkAssociate");
const { default: mongoose } = require("mongoose");
const { productService } = require("../services/productService");
const listTowJoinService = require("../services/listTowJoinService");

exports.productCreate = async (req, res) => {
    try {
        let reqBody = req.body;
        const data = await productModel.create(reqBody);
        res.status(201).json({
            status: "success",
            msg: "Product created successfully",
            data: data,
        });

    } catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: error.toString(),
        });
    }
};

exports.productUpdate = async (req, res) => {
    try {
        let reqBody = req.body;
        const update = reqBody;
        let productId = req.params.productId;
        const data = await productModel.findByIdAndUpdate(productId, update, { new: true });
        if (!data) return res.status(404).json({
            status: "fail",
            msg: "Product not found",
        });
        res.status(200).json({
            status: "success",
            msg: "Product updated successfully",
            data: data,
        });

    } catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: error.toString(),
        });
    }
};

exports.productDelete = async (req, res) => {
    try {
        let productId = new mongoose.Types.ObjectId(req.params.productId);
        const associate = await checkAssociate({ productID: productId }, productDetailsModel);
        if (associate) return res.status(409).json({
            status: "fail",
            msg: "Product has associated details, cannot delete",
        });

        const data = await productModel.findByIdAndDelete(productId);
        if (!data) return res.status(404).json({
            status: "fail",
            msg: "Product not found",
        });
        res.status(200).json({
            status: "success",
            msg: "Product deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: error.toString(),
        });
    }
};

exports.productList = async (req, res) => {
    const data = await productService();
    res.send(data);
};

exports.productListAdmin = async (req, res) => {
    let searchValue = { "$regex": req.params.searchKeyword, "$options": "i" };

    let joinWithBrandId = {
        $lookup: {
            from: "brands", localField: "brandID", foreignField: "_id", as: "brand"
        }
    };

    let joinWithCategoryId = {
        $lookup: {
            from: "categories", localField: "categoryID", foreignField: "_id", as: "category"
        }
    };

    let searchArray = [
        { title: searchValue }, { price: searchValue }, { shortDes: searchValue }, { remark: searchValue }, { "brand.brandName": searchValue },
        { "category.categoryName": searchValue }

    ];

    // unwind category
    const unwindCategory = {
        $unwind: "$category"
    };

    // unwind brand
    const unwindBrand = {
        $unwind: "$brand"
    };

    let result = await listTowJoinService(req, productModel, searchArray, joinWithBrandId, joinWithCategoryId,unwindCategory, unwindBrand);
    res.status(200).send(result);
};