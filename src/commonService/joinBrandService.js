const mongoose = require("mongoose");
const joinBrandService = async (req, dataModel, searchValue, joinOneStage, joinTowStage) => {
    try {
        let brandId = new mongoose.Types.ObjectId(req.params.brandID);
        let pageNo = Number(req.params.pageNo);
        let perPage = Number(req.params.perPage) ;
        let skipRow = (pageNo-1) * perPage;
        let searchValue = req.params.searchValue;
        let data;
        if (Number(searchValue)!==0){
            data = await dataModel.aggregate([
                {$match : { brandID : brandId } },
                { $match : { $or : searchValue } },
                joinOneStage,joinTowStage,
                { $facet : {
                        Total : [ { $count : "total" } ],
                        Rows : [ { $skip : skipRow }, { $limit : perPage } ]
                    } }
            ])
        }else {
            data = await dataModel.aggregate([
                {$match : { brandID : brandId } },
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


module.exports = joinBrandService;