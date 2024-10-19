const { default: mongoose } = require("mongoose");
const brandModel = require("../models/brandModel");
const productModel = require("../models/productModel");
const checkAssociate = require("../services/checkAssociate");

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


exports.brandUpdate = async (req, res) => {
    const id = req.params.brandId;
    const filter = { _id: id }
    try {
        const reqBody = req.body;
        const update = reqBody;
        let brandData = await brandModel.findOneAndUpdate(filter, update, { new: true });
        if (!brandData) return res.status(404).json({
            status: "fail",
            msg: "Brand not found"
        });
        res.status(200).json({
            status: "success",
            msg: "Brand updated successfully",
            data: brandData
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            msg: "Internal server error"
        });
    }
};


exports.brandDelete = async (req, res) => {
    try {
        const id = new mongoose.Types.ObjectId(req.params.brandId);
        const associate = await checkAssociate({ brandID: id }, productModel);
        if (associate) return res.status(400).json({
            status: "fail",
            msg: "Cannot delete brand with associated products"
        });
        const brandData = await brandModel.findByIdAndDelete(id);
        if (!brandData) return res.status(404).json({
            status: "fail",
            msg: "Brand not found"
        });
        return res.status(200).json({
            status: "success",
            msg: "Brand deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: "Internal server error"
        })
    }
};


exports.brandList = async (req, res) => {
    try {
        let data = await brandModel.find();
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

exports.brandListAdmin = async (req, res) => {
    try {

        let pageNo = Number(req.params.pageNo);

        let perPage = Number(req.params.perPage);

        let searchValue = req.params.searchValue ? String(req.params.searchValue) : "";

        let skipRow = (pageNo - 1) * perPage;

        let data;
        if (searchValue !== "0" && searchValue !== "") {
            let searchRegex = { "$regex": searchValue, "$options": "i" };
            let searchQuery = { $or: [{ categoryName: searchRegex }] };
            data = await brandModel.aggregate([
                {
                    $facet: {
                        Total: [{ $match: searchQuery }, { $count: "count" }],
                        Rows: [{ $match: searchQuery }, { $skip: skipRow }, { $limit: perPage }]
                    }
                }
            ]);
        } else {
            data = await brandModel.aggregate([
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