const express = require("express");

const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const categoryController = require("../controllers/categoryController");
const brandController = require("../controllers/brandController");
const productController = require("../controllers/productController");
const productSliderController = require("../controllers/productSliderController");
const featureController = require("../controllers/featureController");
const wishController = require("../controllers/wishController");
const cartController = require("../controllers/addToCartController");
const invoiceController = require("../controllers/invoiceController");
const passwordForgerController = require("../controllers/passwordForgetController");


// profile


router.post("/profile-create",userController.registrationController);
router.post("/login",userController.loginController);
router.get("/profile-details",authMiddleware.isValidUser,userController.profileDetailsController);
router.put("/profile-update",authMiddleware.isValidUser,userController.profileUpdateController);
router.delete("/profile-delete/:id",authMiddleware.isAdmin,userController.profileDeleteController);
router.get("/user-list",authMiddleware.isAdmin,userController.allProfileDataController);


// password forget


router.post("/send-otp/:email" , passwordForgerController.sendOtpController);


// category


router.post("/category-create", authMiddleware.isAdmin,categoryController.categoryCreateController);
router.get("/category-list",categoryController.categoryListController);
router.put("/category-update/:id", authMiddleware.isAdmin, categoryController.categoryUpdateController);
router.delete("/category-delete/:id", authMiddleware.isAdmin, categoryController.categoryDeleteController);
router.get("/category-list-admin", authMiddleware.isAdmin, categoryController.categoryListByAdminController);



// brand


router.post("/brand-create" , authMiddleware.isAdmin,brandController.brandCreateController);
router.get("/brand-list",brandController.brandListController);
router.put("/brand-update/:id",authMiddleware.isAdmin,brandController.brandUpdateController);
router.delete("/brand-delete/:id",authMiddleware.isAdmin,brandController.brandDeleteController);
router.get("/brand-list-admin",authMiddleware.isAdmin,brandController.brandListByAdminController);



//product


router.post("/product-create",authMiddleware.isAdmin,productController.productProductDetailsCreateController);
router.get("/product-list-by-brand/:brandID/:pageNo/:perPage/:searchValue", productController.productListByBrandId);
router.get("/product-list-by-category/:categoryID/:pageNo/:perPage/:searchValue", productController.productListByCategoryId);
router.put("/product-update/:id" , authMiddleware.isAdmin, productController.productUpdateController);
router.get("/product-details/:productID",productController.productDetailsController);
router.get("/product/:remark",productController.productListByRemark);
router.post("/review-create",authMiddleware.isValidUser, productController.productReviewController);
router.get("/product-review-details/:productID", productController.productReviewDetailsController);


// product slider


router.post("/slider-create", authMiddleware.isAdmin, productSliderController.productSliderCreateController);
router.put("/slider-update/:id", authMiddleware.isAdmin, productSliderController.productSliderUpdateController);
router.delete("/slider-delete/:id",authMiddleware.isAdmin, productSliderController.productSliderDeleteController);
router.get("/slider-list" , productSliderController.productSliderListController);
router.get("/slider-list-admin" , authMiddleware.isAdmin, productSliderController.productSliderListByAdminController);


// feature


router.post("/feature-create" , authMiddleware.isAdmin, featureController.featureCreateService);
router.get("/feature-list",featureController.featureListController);
router.put("/feature-update/:id",authMiddleware.isAdmin,featureController.featureUpdateController);
router.delete("/feature-delete/:id", authMiddleware.isAdmin,featureController.featureDeleteController);


// wish


router.post("/wish-add" , authMiddleware.isValidUser, wishController.wishCreateController);
router.delete("/wish-delete/:id",authMiddleware.isValidUser, wishController.wishDeleteService);
router.get("/wish-details/:id",authMiddleware.isValidUser, wishController.wishDetailsController);


//cart


router.post("/cart-add", authMiddleware.isValidUser, cartController.cartCreateController);
router.delete("/cart-delete/:id", authMiddleware.isValidUser, cartController.cartRemoveController);
router.get("/cart-details/:id", authMiddleware.isValidUser, cartController.cartDetailsController);


// invoice

router.post("/invoice-create" , authMiddleware.isValidUser, invoiceController.invoiceCreateService);
router.get("/invoice-list", authMiddleware.isValidUser, invoiceController.invoiceListController);
router.get("/invoice-list-details/:invoiceId", authMiddleware.isValidUser, invoiceController.invoiceDetailsController);


//payment

router.post("/payment-success/:tranId" , invoiceController.paymentSuccessController);
router.post("/payment-cancel/:tranId" , invoiceController.paymentCancelController);
router.post("/payment-fail/:tranId" , invoiceController.paymentFailController);
router.post("/payment-ipn/:tranId" , invoiceController.paymentIpnController);



module.exports = router;