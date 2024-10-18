const jwt = require("jsonwebtoken");

const encodeToken = (data,key,expireIn)=>{
    const token = jwt.sign(data,key, {expireIn} );
    return token;
}

module.exports = {encodeToken};