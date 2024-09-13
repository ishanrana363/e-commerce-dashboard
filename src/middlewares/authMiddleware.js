const {parseUserToken} = require("../helpers/tokenHelper")
const isValidUser = (req,res,next)=>{
    try {
        let userData = parseUserToken(req);
        next()
    } catch (error) {
        res.status(403).send({
            status:"fail",
            msg : " Invalid token "
        })
    }
};

const isAdmin = (req, res, next) => {
    try {
        let userData = parseUserToken(req)
        if (userData.role === "admin") {
            next();
        }else if((req.method==="GET") && (req.path==="/user") && ( req.query.email ===userData.email) ){
            next()
        }
        else {
            res.status(403).send({
                status: "fail",
                msg: "Permission not granted"
            });
        }
    } catch (error) {
        res.status(498 ).send({
            status: "fail",
            msg: "Invalid token"
        });
    }
};


module.exports = {
    isValidUser,
    isAdmin
}