const payMethodRouter = require("express").Router()

const payMethodController = require("../../controllers/admin/paymentMethod.controller")
// const uploadMiddleware = require("../../middlewares/upload.middleware")
const validate = require("../../middlewares/validator.middleware")


payMethodRouter.get("/", payMethodController.getAllPayMethod)
payMethodRouter.get("/:id", validate("getOnePayment"), payMethodController.getOnePayMethod)
payMethodRouter.post("/", validate("createPayment"), payMethodController.createPayMethod)
payMethodRouter.patch("/:id", validate("updatePayment"), payMethodController.updatePayMethod)
payMethodRouter.delete("/:id", validate("deletePayment"), payMethodController.deletePayMethod)

module.exports = payMethodRouter
