const brandModel = require("../models/brandModel");

exports.brandCreate = async (req,res)=>{
    try {
        let reqBody = req.body;
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
