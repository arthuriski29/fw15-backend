const paymentRouter = require("express").Router()
// const validate = require("../middlewares/validator.middleware")
// const authMiddleware = require("../middlewares/auth.middleware")
const paymentController = require("../controllers/payment.controller")

// paymentRouter.get("/", paymentController.getWish)
paymentRouter.post("/", paymentController.createPayment)
paymentRouter.get("/", paymentController.getAllPayment)

module.exports = paymentRouter
