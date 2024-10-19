const jwt = require("jsonwebtoken");
const accessTokenKey = process.env.JWTKEY;

const isLogIn = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            token = req.cookies.accessToken
        }

        if (!token) {
            return res.status(401).json({
                status: "fail",
                msg: "Unauthorized user"
            });
        }



        // Verify the token

        const decode = jwt.verify(token, accessTokenKey);

        if (!decode) {
            return res.status(401).json({
                status: "fail",
                msg: "Invalid token, please log in"
            });
        }

        console.log(decode);


        let _id = decode.user._id;
        req.headers._id = _id;
        let email = decode.user.email;
        req.headers.email = email;
        let role = decode.user.role;
        req.headers.role = role;
        next();


    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: error.message
        });
    }
};

const isLogOut = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            let decode = jwt.verify(token, accessTokenKey);
            if (decode) {
                return res.status(409).json({
                    status: "fail",
                    msg: "You have already login"
                })
            } else {
                return res.status(401).json({
                    status: "fail",
                    msg: "User token expired"
                });
            }
        }
        next();
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: error.toString()
        });
    }
};

const isAdmin = (req, res, next) => {
    try {
        let role = req.headers.role;
        if (role !== "admin") {
            return res.status(403).json({
                status: "fail",
                msg: "You have not permission"
            })
        }
        next();

    } catch (error) {
        return res.status(500).json({
            status: "fail",
            msg: error.toString()
        })
    }
};


module.exports = { isLogIn, isLogOut, isAdmin };