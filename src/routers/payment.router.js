const paymentRouter = require("express").Router()
// const validate = require("../middlewares/validator.middleware")
// const authMiddleware = require("../middlewares/auth.middleware")
const paymentController = require("../controllers/paymentMethod.controller")

// paymentRouter.get("/", paymentController.getWish)
paymentRouter.post("/", paymentController.createReservation)

module.exports = paymentRouter
