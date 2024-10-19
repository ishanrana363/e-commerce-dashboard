const  express = require('express');

const router = express.Router()


// auth controller
const {isLogIn,isLogOut,isAdmin} = require("../middleware/authMiddleware")
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
    "/user/sign-up",
    userController.signUp
);

router.get("/user-profile", isLogIn, userController.userProfile);
router.put("/user-profile-update", isLogIn, userController.userProfileUpdate);
router.get("/update-user-role/:userId", isLogIn, isAdmin, userController.userRoleUpdate)

// auth related api

router.post
(
    "/sing-in",
    authController.signIn
);

// product related api
router.post("/product/create", isLogIn,isAdmin, productController.productCreate);
router.put("/product/update/:productId", isLogIn, isAdmin, productController.productUpdate);
router.delete("/product/delete/:productId", isLogIn, isAdmin, productController.productDelete);
router.get("/product/list", productController.productList);
router.get("/product/list/:pageNo/:perPage/:searchKeyword", isLogIn, isAdmin,  productController.productListAdmin);

// brand related api

router.post("/brand/create", isLogIn, isAdmin , brandController.brandCreate);
router.put("/brand/update/:brandId", isLogIn, isAdmin, brandController.brandUpdate);
router.delete("/brand/delete/:brandId", isLogIn, isAdmin, brandController.brandDelete);
router.get("/brandlist", brandController.brandList);
router.get("/brandlist/:pageNo/:perPage/:searchValue", brandController.brandListAdmin);

// category related api

router.post("/category/create", isLogIn,isAdmin,categoryController.categoryCreate);
router.put("/category/update/:categoryId", isLogIn,isAdmin,categoryController.categoryUpdate);
router.delete("/category/delete/:categoryId", isLogIn, isAdmin, categoryController.categoryDelete);
router.get("/category/list/admin/:pageNo/:perPage/:searchValue" , isLogIn,isAdmin,categoryController.categoryListAdmin);
router.get("/category/list", categoryController.categoryList);

module.exports = router;
