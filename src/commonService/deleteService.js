
const deleteService = async (req,dataModel) => {
    try {
        let id = req.params.id;
        let filter = {
            _id : id
        };
        let data = await dataModel.deleteOne(filter);
        return{status:"success",data:data};
    }catch (e){
        console.log(`delete service error ${e}`);
        return {status:"fail",msg:e.toString()};
    }
};


module.exports = deleteService;