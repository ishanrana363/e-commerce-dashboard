const productModel = require("../models/productModel");

export const productCreate = async (req, res) => {
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
