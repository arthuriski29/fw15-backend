const reservationsRouter = require("express").Router()
// const validate = require("../middlewares/validator.middleware")
// const authMiddleware = require("../middlewares/auth.middleware")
const reservationsController = require("../controllers/reservation.controller")

reservationsRouter.get("/", reservationsController.getUserReservation)
reservationsRouter.post("/", reservationsController.createReservation)
reservationsRouter.post("/ticket",  reservationsController.makeTicket)

module.exports = reservationsRouter
