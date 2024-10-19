const productDetailsModel = require("../models/productDetailsModel");
const { productDetailsService } = require("../services/productDetailsService");


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

exports.productDetailsUpdate = async (req, res) => {
    try {
        let reqBody = req.body;
        let productDetailsID = req.params.productDetailsID;
        let filter = { _id: productDetailsID };
        let update = reqBody;

        // Find product details by productID and update
        let productDetailsData = await productDetailsModel.findOneAndUpdate(filter, update, { new: true });
        
        // If no product details are found, send a 404 response
        if (!productDetailsData) {
            return res.status(404).json({
                status: "fail",
                msg: "Product details not found"
            });
        }

        // If the update is successful, send a success response
        res.status(200).json({
            status: "success",
            msg: "Product details updated successfully",
            data: productDetailsData
        });

    } catch (error) {
        console.error(error);
        // If an error occurs, send a 500 response with an error message
        res.status(500).json({
            status: "fail",
            msg: "Internal server error"
        });
    }
};

exports.productDetailsDelete = async (req, res) => {
    try {
        let productDetailsID = req.params.productDetailsId;
        const filter = {_id : productDetailsID};
        let productDetailsData = await productDetailsModel.findByIdAndDelete(filter);
        
        // If no product details are found, send a 404 response
        if (!productDetailsData) {
            return res.status(404).json({
                status: "fail",
                msg: "Product details not found"
            });
        }
        
        // If the deletion is successful, send a success response
        res.status(200).json({
            status: "success",
            msg: "Product details deleted successfully"
        });
        
    } catch (error) {
        // If an error occurs, send a 500 response with an error message
        res.status(500).json({
            status: "fail",
            msg: "Internal server error"
        });
    }
};

exports.productDetailsList = async (req, res) => {
    const data = await productDetailsService();
    res.send(data);
};