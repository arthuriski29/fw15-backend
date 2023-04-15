const payMethodRouter = require("express").Router()

const payMethodController = require("../../controllers/admin/paymentMethod.controller")
// const uploadMiddleware = require("../../middlewares/upload.middleware")
const validate = require("../../middlewares/validator.middleware")


payMethodRouter.get("/", payMethodController.getAllPayMethod)
payMethodRouter.get("/:id", validate("idParams"), payMethodController.getOnePayMethod)
payMethodRouter.post("/", payMethodController.createPayMethod)
payMethodRouter.patch("/:id", validate("idParams"), payMethodController.updatePayMethod)
payMethodRouter.delete("/:id", validate("idParams"), payMethodController.deletePayMethod)

module.exports = payMethodRouter
