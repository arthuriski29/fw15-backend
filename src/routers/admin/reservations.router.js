const reservationsRouter = require("express").Router()

const reservationsController = require("../../controllers/admin/reservations.controller")
// const uploadMiddleware = require("../../middlewares/upload.middleware")
const validate = require("../../middlewares/validator.middleware")


reservationsRouter.get("/", reservationsController.getAllReservations)
reservationsRouter.get("/:id", validate("idParams"), reservationsController.getOneReservation)
reservationsRouter.post("/", reservationsController.createReservation)
reservationsRouter.patch("/:id", validate("idParams"), reservationsController.updateReservation)
reservationsRouter.delete("/:id", validate("idParams"), reservationsController.deleteReservation)

module.exports = reservationsRouter
