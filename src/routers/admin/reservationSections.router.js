const resSectionsRouter = require("express").Router()

const reservationsController = require("../../controllers/admin/reservations.controller")
// const uploadMiddleware = require("../../middlewares/upload.middleware")
const validate = require("../../middlewares/validator.middleware")


resSectionsRouter.get("/", reservationsController.getAllReservations)
resSectionsRouter.get("/:id", validate("idParams"), reservationsController.getOneReservation)
resSectionsRouter.post("/", reservationsController.createReservation)
resSectionsRouter.patch("/:id", validate("idParams"), reservationsController.updateReservation)
resSectionsRouter.delete("/:id", validate("idParams"), reservationsController.deleteReservation)

module.exports = resSectionsRouter
