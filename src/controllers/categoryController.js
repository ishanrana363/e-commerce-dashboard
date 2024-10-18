const categoryModel = require("../models/categoryModel");

export const categoryCreate = async (req,res)=>{
    try {
        let {name} = req.body;
        const reqBody = req.body;
        let categoryData = await categoryModel.findOne({name:name});
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