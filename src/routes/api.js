const  express = require('express');

const router = express.Router()



// user controller
const userController = require("../controllers/userController");

// user related api

router.post
(
    "/user/sign-in",
    userController.signIn
);



module.exports = router;
