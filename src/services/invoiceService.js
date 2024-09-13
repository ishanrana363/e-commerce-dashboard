const cartModel = require("../models/cartModel");
const invoiceModel = require("../models/invoiceModel");
const invoiceProductModel = require("../models/invoiceProductsModel");
const profileModel = require("../models/profileModele");
const paymentSettingModel = require("../models/paymentSittingModel");
const from_data = require("form-data");
const axios = require("axios");
const {parseUserToken} = require("../helpers/tokenHelper");
const mongoose = require("mongoose");


const invoiceCreateService = async (req) => {
    try{
        let parseToken = parseUserToken(req);
        let user_id = parseToken.userId;
        let userId = new mongoose.Types.ObjectId(user_id)
        let user_email = parseToken.email;

        // (1) // calculate total payble vat and delivery_charge


        let matchStage = { $match : { userID : userId    } };

        let joinWithProductId = {
            $lookup : {
                from :"products" , localField:"productID" , foreignField:"_id", as : "product"
            }
        };

        let unwindProduct = { $unwind : "$product" };

        let cartProducts = await cartModel.aggregate([
            joinWithProductId,matchStage,unwindProduct
        ]);

        let totalAmount = 0;

        cartProducts.forEach((element)=>{
            let price;
            if (element["product"]["discount"]){
                price = parseFloat(element["product"]["discount_price"])
            }else {
                price = parseFloat(element["product"]["price"])
            }
            totalAmount += parseFloat(element["qty"]) * price;
        })

        let vat = totalAmount*0.05;

        let delivery_charge = 120;

        let total = totalAmount+vat+delivery_charge;


        // (2) prepared customer details and shipping details

        let profileDataMatch = { $match : { _id : userId    } };

        let profileData = await profileModel.aggregate([
            profileDataMatch
        ]);

        let cus_details = ` Name : ${profileData[0]["cus_name"]}, Email ${user_email}, Address : ${profileData[0]["cus_add"]}
         Phone : ${profileData[0]["cus_phone"]}
         `
        let ship_details = `Name : ${profileData[0]["ship_name"]}, Email ${user_email}, Address : ${profileData[0]["ship_add"]}
         Phone : ${profileData[0]["ship_phone"]}
         `

        // (3) prepared transition id and other id

        let tran_id = Math.floor(100000+ Math.random()*999999);
        let valid_id= 0 ;
        let delivery_status = "pending";
        let payment_status = "pending";


        // (4) create invoice

        let invoiceCreate = await invoiceModel.create({
            userID : user_id ,
            payble : totalAmount,
            cus_details : cus_details,
            ship_details : ship_details,
            tran_id : tran_id,
            valid_id : valid_id,
            delivery_status : delivery_status  ,
            payment_status : payment_status ,
            vat : vat,
            delivery_charge : delivery_charge,
            total : total
        })

        // (5) create invoice product

        let invoiceId = invoiceCreate["_id"];

        cartProducts.forEach(async (element)=>{
            await invoiceProductModel.create({
                userId : user_id ,
                productId : element["productID"]  ,
                invoiceId : invoiceId,
                qty : element["qty"] ,
                price : element["product"]["discount"] ? element["product"]["discount_price"] : element["product"]["price"]  ,
                color : element["color"],
                size : element["size"]
            })
        });

        // (6) remove cart

        await cartModel.deleteMany({userID: user_id});

        // (7) prepared ssl commerce

        let paymentData = await paymentSettingModel.find();


        let fromData = new from_data();


        fromData.append("store_id",paymentData[0]["store_id"]);
        fromData.append("store_passwd", paymentData[0]["store_password"] );
        fromData.append("total_amount",total);
        fromData.append("currency",paymentData[0]["currency"]);
        fromData.append("tran_id",tran_id);
        fromData.append("success_url", ` ${paymentData[0]["success_url"]}/${tran_id}`);
        fromData.append("fail_url",` ${paymentData[0]["fail_url"]}/${tran_id}` );
        fromData.append("cancel_url" ,` ${paymentData[0]["cancel_url"]}/${tran_id}`);
        fromData.append("ipn_url", ` ${paymentData[0]["ipn_url"]}/${tran_id}` );


        fromData.append("cus_name", profileData[0]["cus_name"]);
        fromData.append("cus_email" , user_email );
        fromData.append("cus_add1" , profileData[0]["cus_add"]);
        fromData.append("cus_add2", profileData[0]["cus_add"]);
        fromData.append("cus_city", profileData[0]["cus_city"]);
        fromData.append("cus_state", profileData[0]["cus_state"]);
        fromData.append("cus_postcode", profileData[0]["cus_postcode"]);
        fromData.append("cus_country", profileData[0]["cus_country"]);
        fromData.append("cus_phone", profileData[0]["cus_phone"]);
        fromData.append("cus_fax", profileData[0]["cus_fax"]);


        fromData.append("ship_name", profileData[0]["ship_name"]);
        fromData.append("ship_add1", profileData[0]["ship_add"]);
        fromData.append("ship_add2", profileData[0]["ship_add"] );
        fromData.append("ship_city", profileData[0]["ship_city"]);
        fromData.append("ship_state", profileData[0]["ship_state"]);
        fromData.append("ship_postcode", profileData[0]["ship_postcode"]);
        fromData.append("ship_country", profileData[0]["ship_country"]);

        fromData.append("product_name", "According to invoice" );
        fromData.append("product_category", "According to invoice " );
        fromData.append("product_profile", "According to invoice " );

        let sslRes = await axios.post(paymentData[0]["init_url"],fromData);

        return {status:"success",data:sslRes.data};

    }catch (e) {
        console.log(e)
        return {status:"fail",msg:e.toString()};
    }
};

const paymentSuccessService = async (req) => {
    try {
        let tranId = req.params.tranId;
        let filter = {tran_id:tranId}
        await invoiceModel.updateOne(filter,{payment_status:"success"});
        return {status:"success"};
    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
};

const paymentFailService = async (req) => {
    try {
        let tranId = req.params.tranId;
        let filter = {tran_id:tranId}
        await invoiceModel.updateOne(filter,{payment_status:"fail"});
        return {status:"success"};
    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
};

const paymentCancelService = async (req) => {
    try {
        let tranId = req.params.tranId;
        let filter = {tran_id:tranId}
        await invoiceModel.updateOne(filter,{payment_status:"cancel"});
        return {status:"success"};
    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
};

const paymentIpnService = async (req) => {
    try {
        let tranId = req.params.tranId;
        let filter = {tran_id:tranId};
        let status = req.body["status"]
        await invoiceModel.updateOne(filter,{payment_status:status});
        return {status:"success"};
    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
};

const invoiceListService = async (req) => {
    let parseToken = parseUserToken(req);
    let userId = new mongoose.Types.ObjectId(parseToken.userId);
    try {
        let filter = { userID : userId };
        let data = await invoiceModel.find(filter);
        return {status:"success",data:data};
    }catch (e) {
        return {status:"fail", msg:e.toString() };
    }
};

const invoiceListDetailsService =async (req) => {
    try {
        let parseToken = parseUserToken(req);
        let userId = new mongoose.Types.ObjectId(parseToken.userId);
        let invoiceId = new mongoose.Types.ObjectId(req.params.invoiceId);
        let matchStage = { $match : { userId : userId ,invoiceId : invoiceId } };

        let joinWithProductId = {
            $lookup: {
                from: "products", localField: "productId", foreignField: "_id", as: "product"
            }
        };

        let unwindProductId = { $unwind: "$product" }

        const data = await invoiceProductModel.aggregate([
            matchStage,joinWithProductId,unwindProductId
        ]);

        return {status:"success",data:data};

    }catch (e) {
        return {status:"fail",msg:e.toString()};
    }
};

module.exports = {
    invoiceCreateService,
    paymentSuccessService,
    paymentFailService,
    paymentCancelService,
    paymentIpnService,
    invoiceListService,
    invoiceListDetailsService
}