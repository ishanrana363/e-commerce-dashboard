const ListOneJoinService = async (req, dataModel, searchArray, joinStage) => {
    try {
        let pageNo = Number(req.params.pageNo);
        let perPage = Number(req.params.perPage);
        let searchValue = req.params.searchKeyword;
        let userEmail = req.headers['email'];
        let skipRow = (pageNo - 1) * perPage;

        let data;

        if (Number(searchValue) !== 0) {
            data = await dataModel.aggregate([
                { $match: { userEmail: userEmail } },
                joinStage,
                { $match: { $or: searchArray } },
                {
                    $facet: {
                        Total: [{ $count: "count" }],
                        Rows: [{ $skip: skipRow }, { $limit: perPage }]
                    }
                }
            ])

        }
        else {
            data = await dataModel.aggregate([
                { $match: { userEmail: userEmail } },
                joinStage,
                {
                    $facet: {
                        Total: [{ $count: "count" }],
                        Rows: [{ $skip: skipRow }, { $limit: perPage }]
                    }
                }
            ])
        }
        return { status: "success", data: data }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}
module.exports = ListOneJoinService