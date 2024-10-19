const brandModel = require("../models/brandModel");

exports.brandCreate = async (req,res)=>{
    try {
        let reqBody = req.body;
        const {brandName} = req.body;
        let brandData = await brandModel.findOne({ brandName:brandName });
        if(brandData) return res.status(409).json({
            status:"fail",
            msg : "Brand already exists"
        });
        let data = await brandModel.create(reqBody);
        return res.status(201).json({
            status : "success",
            msg : "Brand created successfully",
            data : data
        });
    } catch (error) {
        return res.status(500).json({
            status : "fail",
            msg : error.toString()
        });
    }
};
