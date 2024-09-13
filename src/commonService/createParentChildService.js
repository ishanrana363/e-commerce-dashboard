const mongoose = require("mongoose");
const {parseUserToken} = require("../helpers/tokenHelper");
const createParentChildService = async (req,parentModel,childModel,joinPropertyName) => {
    const parseToken = parseUserToken(req);
    let session = await mongoose.startSession();
    try {
        await session.startTransaction();
        //1st database process
        let parent = req.body["parent"];
        parent.userEmail = parseToken.email;
        let parentCreation = await parentModel.create([parent],{session});

        //second database process

        let child = req.body["child"];

        child.forEach((element)=>{
            element[joinPropertyName] = parentCreation[0]["_id"];
            element.userEmail = parseToken.email;
        });
        let childCreation = await childModel.create(child,{session});

        await session.commitTransaction();
        await session.endSession();

        return { status:"success" , parent : parentCreation,child:childCreation }


    }catch (e) {

        await session.abortTransaction();
        await session.endSession();
        return {status:"fail",msg:e.toString()};

    }
};


module.exports = createParentChildService;