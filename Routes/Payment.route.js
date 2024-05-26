
const express=require('express');
const { checkout, paymentVerification } = require('../Controllers/PaymentGateway');
const paymentRouter=express.Router()


paymentRouter.route("/checkout",checkout);

paymentRouter.route("/paymentverification",paymentVerification);