const  express = require('express');

const router = express.Router()



// user controller
const userController = require("../controllers/userController");
// user auth controller
const authController = require("../controllers/authController");

// user related api

router.post
(
    "/user/sign-in",
    userController.signIn
);

// auth related api

router.post
(
    "/sing-in",
    authController.signIn
);


module.exports = router;
