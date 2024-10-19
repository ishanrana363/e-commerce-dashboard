const listTowJoinService = async (req,dataModel,searchArray,joinOneState,joinTowState,unwindCategory, unwindBrand) => {
    try {
        let perPage = Number(req.params.perPage);
        let pageNo = Number(req.params.pageNo);
        let skipRow = (pageNo-1)*perPage;
        let searchValue = req.params.searchKeyword;
        let data;
        if ( Number(searchValue)!== 0 ){
            data = await dataModel.aggregate([
                { $match : { $or : searchArray } },
                joinOneState,joinTowState,unwindCategory, unwindBrand,
                {
                    $facet : {
                        Total : [ { $count : "total" } ],
                        Rows : [{ $skip:skipRow },{ $limit:perPage }]
                    }
                }
            ]);
        }else {
            data = await dataModel.aggregate([
                joinOneState,joinTowState,unwindCategory, unwindBrand,
                {
                    $facet : {
                        Total : [ { $count : "total" } ],
                        Rows : [{ $skip:skipRow },{ $limit:perPage }]
                    }
                }
            ]);
        }
        return{ status:"success",data : data };
    }catch (e) {
        return{ status:"fail",msg : e.toString() };
    }
};


module.exports = listTowJoinService;