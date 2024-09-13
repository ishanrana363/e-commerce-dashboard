const checkAssociate = async (queryObj,associateModel) => {
    try {
        let data = await associateModel.aggregate([
            { $match : queryObj }
        ]);
        console.log(data)
        return data.length>0;
    }catch (e) {
        return false;
    }
};


module.exports = checkAssociate;