const mongoose = require("mongoose");
const categoryJoinService = async (req, dataModel, searchArray, joinOneStage, joinTowStage) => {
    try {
        let categoryId = new mongoose.Types.ObjectId(req.params.categoryID);
        let pageNo = Number(req.params.pageNo);
        let perPage = Number(req.params.perPage) ;
        let skipRow = (pageNo-1) * perPage;
        let searchValue = req.params.searchValue;
        let data;
        if (Number(searchValue)!==0){
            data = await dataModel.aggregate([
                {$match : { categoryID : categoryId } },
                { $match : { $or : searchArray } },
                joinOneStage,joinTowStage,
                { $facet : {
                    Total : [ { $count : "total" } ],
                    Rows : [ { $skip : skipRow }, { $limit : perPage } ]
                } }
            ])
        }else {
            data = await dataModel.aggregate([
                {$match : { categoryID : categoryId } },
                joinOneStage,joinTowStage,
                {
                    $facet : {
                        Total : [{ $count : "total" }],
                        Rows : [{ $skip : skipRow }, { $limit : perPage } ]
                    }
                }
            ])
        }

        return {status:"success",data:data};

    }catch (e) {
        return {status:"fail",msg:e.toString()};

    }
};


module.exports = categoryJoinService;