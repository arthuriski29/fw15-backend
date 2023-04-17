const resStatusRouter = require("express").Router()

const resStatusController = require("../../controllers/admin/reservationStatus.controller")
// const uploadMiddleware = require("../../middlewares/upload.middleware")
const validate = require("../../middlewares/validator.middleware")


resStatusRouter.get("/", resStatusController.getAllResStatus)
resStatusRouter.get("/:id", validate("getOneResStatus"), resStatusController.getAllResStatus)
resStatusRouter.post("/", validate("createResStatus"), resStatusController.createResStatus)
resStatusRouter.patch("/:id", validate("updateResStatus"), resStatusController.updateResStatus)
resStatusRouter.delete("/:id", validate("deleteResStatus"), resStatusController.deleteResStatus)

module.exports = resStatusRouter
