const { default: mongoose } = require("mongoose");
const productDetailsModel = require("../models/productDetailsModel");

exports.productDetailsService = async (req, res) => {
    try {
        // join with product details id
        const joinWithProductDetails = {
            $lookup: {
                from: "products",
                localField: "productID",
                foreignField: "_id",
                as: "productDetails"
            }
        };
        // unwind productDetails
        const unwindProductDetails = {
            $unwind: "$productDetails"
        };

        // join with categoryId

        const joinWithCategoryId = {
            $lookup: {
                from: "categories",
                localField: "productDetails.categoryID",
                foreignField: "_id",
                as: "category"
            }
        };

        // join with brandId

        const joinWithBrandId = {
            $lookup: {
                from: "brands",
                localField: "productDetails.brandID",
                foreignField: "_id",
                as: "brand"
            }
        };

        // unw?ind categoryId

        const unwindCategory = {
            $unwind: "$category"
        };

        // unwind brandId

        const unwindBrand = {
            $unwind: "$brand"
        };

        const productData = await productDetailsModel.aggregate([
            joinWithProductDetails, unwindProductDetails, joinWithCategoryId, joinWithBrandId,
            unwindCategory, unwindBrand,
        ]);
        if (productData.length === 0) return {
            status: "fail",
            msg: "Product details not found"
        };

        return {
            status: "success",
            data: productData
        };

    } catch (error) {
        return { status: "fail", msg: error.message };
    }

};

exports.singleProductListService = async (req, res) => {
    let productId = new mongoose.Types.ObjectId(req.params.productId);
    let matchStage = { $match: { _id: productId } };
    try {
        // join with product details id
        const joinWithProductDetails = {
            $lookup: {
                from: "products",
                localField: "productID",
                foreignField: "_id",
                as: "productDetails"
            }
        };
        // unwind productDetails
        const unwindProductDetails = {
            $unwind: "$productDetails"
        };

        // join with categoryId

        const joinWithCategoryId = {
            $lookup: {
                from: "categories",
                localField: "productDetails.categoryID",
                foreignField: "_id",
                as: "category"
            }
        };

        // join with brandId

        const joinWithBrandId = {
            $lookup: {
                from: "brands",
                localField: "productDetails.brandID",
                foreignField: "_id",
                as: "brand"
            }
        };

        // unw?ind categoryId

        const unwindCategory = {
            $unwind: "$category"
        };

        // unwind brandId

        const unwindBrand = {
            $unwind: "$brand"
        };

        const productData = await productDetailsModel.aggregate([
            matchStage,
            joinWithProductDetails, unwindProductDetails, joinWithCategoryId, joinWithBrandId,
            unwindCategory, unwindBrand,
        ]);
        if (productData.length === 0) return {
            status: "fail",
            msg: "Product details not found"
        };
        return {
            status: "success",
            data: productData
        };
    } catch (error) {
        return { status: "fail", msg: error.message };
    }
};