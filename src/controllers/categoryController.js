const { mongo } = require("mongoose");
const categoryModel = require("../models/categoryModel");
const { default: mongoose } = require("mongoose");
const checkAssociate = require("../services/checkAssociate");
const productModel = require("../models/productModel");

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
    try {
        const id = new mongoose.Types.ObjectId(req.params.categoryId);
        const associate = await checkAssociate({ categoryID: id }, productModel);
        if (associate) return res.status(400).json({
            status: "fail",
            msg: "Cannot delete category with associated products"
        });
        const categoryData = await categoryModel.findByIdAndDelete(id);
        if (!categoryData) return res.status(404).json({
            status: "fail",
            msg: "Category not found"
        });
        return res.status(200).json({
            status: "success",
            msg: "Category deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: "Internal server error"
        })
    }
};

exports.categoryList = async (req, res) => {
    try {
        let data = await categoryModel.find();
        res.status(200).json({
            status: "success",
            data: data
        });
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: "Internal server error"
        })
    }
};

exports.categoryListAdmin = async (req, res) => {
    try {

        let pageNo = Number(req.params.pageNo);

        let perPage = Number(req.params.perPage);

        let searchValue = req.params.searchValue ? String(req.params.searchValue) : "";

        let skipRow = (pageNo - 1) * perPage;

        let data;
        if (searchValue !== "0" && searchValue !== "") {
            let searchRegex = { "$regex": searchValue, "$options": "i" };
            let searchQuery = { $or: [{ categoryName: searchRegex }] };
            data = await categoryModel.aggregate([
                {
                    $facet: {
                        Total: [{ $match: searchQuery }, { $count: "count" }],
                        Rows: [{ $match: searchQuery }, { $skip: skipRow }, { $limit: perPage }]
                    }
                }
            ]);
        } else {
            data = await categoryModel.aggregate([
                {
                    $facet: {
                        Total: [{ $count: "count" }],
                        Rows: [{ $skip: skipRow }, { $limit: perPage }]
                    }
                }
            ]);
        }

        res.status(200).send({
            msg: "category fetched successfully",
            status: "success",
            data: data
        });
    } catch (error) {
        res.status(500).send({
            msg: "Failed to fetch category",
            status: "fail",
            error: error.toString()
        });
    }
};