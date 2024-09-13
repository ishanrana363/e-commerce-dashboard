const jwt = require("jsonwebtoken");

const parseUserToken = (req)=>{
    try {
        let authToken = req.headers.authorization;
        let userToken = authToken.split(' ')[1];
        const verifyToken = jwt.verify(userToken, process.env.JWTPASS);
        return verifyToken;
    }catch (e) {
        throw new Error();
    }
};

module.exports = {parseUserToken};