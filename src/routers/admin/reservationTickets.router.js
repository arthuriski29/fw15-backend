const resTicketsRouter = require("express").Router()

const resTicketsController = require("../../controllers/admin/reservationTickets.controller")
// const uploadMiddleware = require("../../middlewares/upload.middleware")
const validate = require("../../middlewares/validator.middleware")


resTicketsRouter.get("/", resTicketsController.getAllResTickets)
resTicketsRouter.get("/:id", validate("idParams"), resTicketsController.getOneResTickets)
resTicketsRouter.post("/", resTicketsController.createResTickets)
resTicketsRouter.patch("/:id", validate("idParams"), resTicketsController.updateResTickets)
resTicketsRouter.delete("/:id", validate("idParams"), resTicketsController.deleteResTickets)

module.exports = resTicketsRouter
