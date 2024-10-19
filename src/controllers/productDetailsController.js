const productDetailsModel = require("../models/productDetailsModel");


exports.productDetailsCreate = async (req, res) => {
    try {

        let reqBody = req.body;

        let productID = req.body.productID;

        let productDetailsData = await productDetailsModel.findOne({productID : productID});

        if (productDetailsData) return res.status(409).json({
            status: "fail",
            msg: "Product details already exists"
        });

        let newProductDetailsData = await productDetailsModel.create(reqBody);
        res.status(201).json({
            status: "success",
            msg: "Product details created successfully",
            data: newProductDetailsData
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "fail",
            msg: "Internal server error"
        });
    }
};