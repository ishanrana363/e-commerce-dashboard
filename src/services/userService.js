const profileModel = require("../models/profileModele");
const jwt = require("jsonwebtoken");
const {parseUserToken} = require("../helpers/tokenHelper");

const registrationService = async (req) => {
    try{
        let reqBody = req.body;
        let {email} = req.body;
        reqBody.role = "user";
        let userEmail = await profileModel.findOne({email: email});
        if (userEmail){
            return {
                status:"fail",
                msg : "User already exists"
            }
        }
        let data = await profileModel.create(reqBody);
        return{
            status:"success",data : data
        };
    }catch (e){
        console.log(e)
        return {
            status:"fail",msg:e.toString()
        };
    }
};

const loginService = async (req) => {
    try {
        let {email,password} = req.body;
        let filter = {
            email : email,
            password : password
        };

        let userData = await profileModel.findOne(filter);
        if (!userData){
            return {status:"fail",msg:"User not found"};
        }else {
            let payload = {
                exp : Math.floor(Date.now()/1000) + (60*60*24),
                email : userData.email,
                role : userData.role,
                userId : userData["_id"]
            };
            let token = jwt.sign(payload,process.env.JWTPASS);
            return {
                status:"success",token : token
            };
        }
    }catch (e) {
        return {
            status:"fail",msg:e.toString()
        };
    }
};

const profileReadService = async (req) => {
    let parseToken = parseUserToken(req)
    try {
        let filter = {
            email : parseToken.email,
            _id : parseToken.userId
        };
        let userData = await profileModel.findOne(filter);
        return {
            status:"success", data : userData
        };
    }catch (e) {
        console.log("error is ",e)
        return {
            status:"fail",msg:e.toString()
        };

    }
};

const profileUpdateService = async (req) => {
    const userToken = parseUserToken(req);
    try {
        let filter = {
            email : userToken.email,
            _id : userToken.userId
        };
        let reqBody = req.body;

        let userUpdateData = await profileModel.updateOne(filter,reqBody);

        return {status:"success",data:userUpdateData};

    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
};

const profileDetailsService = async (req) => {
    const parseToken = parseUserToken(req);
    try {
        let id = req.params.id;
        let filter = {
            _id : id
        };
        if (parseToken.role==="admin"){
            let userDeleteData = await profileModel.deleteOne(filter);
            return {
                status:"success", data : userDeleteData
            }
        }else {
            return {
                status:"fail",msg:"Permission not allow"
            };
        }
    }catch (e) {
        return {
            status:"fail",msg:e.toString()
        };
    }
  
};

const allProfileDataServices =async(req) => {
    let parseToken = parseUserToken(req);
    try {
        if (parseToken.role==="admin"){
            let userData = await profileModel.find();
            return {
                status:"success",data : userData
            };
        }else{
            return { status:"fail",msg:"Permission not allowed" };
        }
    }catch (e) {
        return { status:"fail",msg:e.toString() };
    }
}

module.exports = {
    registrationService,
    loginService,
    profileReadService,
    profileUpdateService,
    profileDetailsService,
    allProfileDataServices
};

