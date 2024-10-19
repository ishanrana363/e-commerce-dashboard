const categoryModel = require("../models/categoryModel");

exports.categoryCreate = async (req, res) => {
    try {
        let { categoryName } = req.body;
        const reqBody = req.body;
        let categoryData = await categoryModel.findOne({ categoryName: categoryName });
        if (categoryData) return res.status(409).json({
            status: "fail",
            msg: "Category already exists"
        });
        let data = await categoryModel.create(reqBody);
        res.status(201).json({
            status: "success",
            msg: "Category created successfully",
            data: data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "fail",
            msg: "Internal server error"
        });
    }
};

exports.categoryUpdate = async (req, res) => {
    const id = req.params.categoryId;
    const filter = { _id: id }
    try {
        const reqBody = req.body;
        const update = reqBody;
        let categoryData = await categoryModel.findOneAndUpdate(filter, update, { new: true });
        if (!categoryData) return res.status(404).json({
            status: "fail",
            msg: "Category not found"
        });
        res.status(200).json({
            status: "success",
            msg: "Category updated successfully",
            data: categoryData
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "fail",
            msg: "Internal server error"
        });
    }
};

exports.categoryDelete = async (req, res) => {
    
};