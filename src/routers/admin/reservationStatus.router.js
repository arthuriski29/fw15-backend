const resStatusRouter = require("express").Router()

const resStatusController = require("../../controllers/admin/reservationStatus.controller")
// const uploadMiddleware = require("../../middlewares/upload.middleware")
const validate = require("../../middlewares/validator.middleware")


resStatusRouter.get("/", resStatusController.getAllResStatus)
resStatusRouter.get("/:id", validate("idParams"), resStatusController.getAllResStatus)
resStatusRouter.post("/", resStatusController.createResStatus)
resStatusRouter.patch("/:id", validate("idParams"), resStatusController.updateResStatus)
resStatusRouter.delete("/:id", validate("idParams"), resStatusController.deleteResStatus)

module.exports = resStatusRouter
