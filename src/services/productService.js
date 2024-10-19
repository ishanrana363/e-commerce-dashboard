const productModel = require("../models/productModel");


exports.productService = async (req, res) => {
    try {
        // join with categoryId
        const joinWithCategory = {
            $lookup: {
                from: "categories",
                localField: "categoryID",
                foreignField: "_id",
                as: "category"
            }
        };

        // join with brandId
        const joinWithBrand = {
            $lookup: {
                from: "brands",
                localField: "brandID",
                foreignField: "_id",
                as: "brand"
            }
        };

        // unwind category
        const unwindCategory = {
            $unwind: "$category"
        };

        // unwind brand
        const unwindBrand = {
            $unwind: "$brand"
        };

        const products = await productModel.aggregate([
            joinWithCategory,
            joinWithBrand,
            unwindCategory,
            unwindBrand
        ]);

        if (products.length === 0) return{
            status: "fail",
            msg: "No products found"
        }

        return {
            status: "success",
            data: products
        }


    } catch (error) {
        console.log(error)
        return {
            status: "fail",
            msg: "Internal server error"
        }
    }
};