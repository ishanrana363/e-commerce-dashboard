const categoryModel = require("../models/categoryModel");

exports.categoryCreate = async (req,res)=>{
    try {
        let {categoryName} = req.body;
        const reqBody = req.body;
        let categoryData = await categoryModel.findOne({categoryName:categoryName});
        if(categoryData) return res.status(409).json({
            status:"fail",
            msg : "Category already exists"
        });
        let data = await categoryModel.create(reqBody);
        res.status(201).json({
            status:"success",
            msg : "Category created successfully",
            data : data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:"fail",
            msg : "Internal server error"
        });
    }
};