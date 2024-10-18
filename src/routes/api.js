const  express = require('express');

const router = express.Router()



// user controller
const userController = require("../controllers/userController");
// user auth controller
const authController = require("../controllers/authController");
// product controller
const productController = require("../controllers/productController");
// brand controller
const brandController = require("../controllers/brandController");
// category controller
const categoryController = require("../controllers/categoryController");

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

// product related api
router.post("/product/create", productController.productCreate);

// brand related api

router.post("/brand/create", brandController.brandCreate);

// category related api

router.post("/category/create", categoryController.categoryCreate);


module.exports = router;
