const {invoiceCreateService,paymentSuccessService,paymentCancelService,
    paymentFailService,paymentIpnService,invoiceListService,invoiceListDetailsService} = require("../services/invoiceService");


exports.invoiceCreateService = async (req,res)=>{
    let result = await invoiceCreateService(req);
    res.status(201).send(result);
};

exports.paymentSuccessController = async (req,res)=>{
    let result = await paymentSuccessService(req);
    res.status(200).send(result);
};

exports.paymentCancelController = async (req,res)=>{
    let result = await paymentCancelService(req);
    res.status(400).send(result);
};

exports.paymentFailController = async (req,res)=>{
    let result = await paymentFailService(req);
    res.status(402).send(result);
};

exports.paymentIpnController = async (req,res)=>{
    let result = await paymentIpnService(req);
    res.status(200).send(result);
};

exports.invoiceListController = async (req,res)=>{
    let result = await invoiceListService(req);
    res.status(200).send(result);
};

exports.invoiceDetailsController = async (req,res)=>{
    let result = await invoiceListDetailsService(req);
    res.status(200).send(result);
};