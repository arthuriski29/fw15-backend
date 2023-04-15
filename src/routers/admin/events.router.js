const eventRouter = require("express").Router()

const eventController = require("../../controllers/admin/events.controllers")
const uploadMiddleware = require("../../middlewares/upload.middleware")
const validate = require("../../middlewares/validator.middleware")


eventRouter.get("/", eventController.getAllEvents)
eventRouter.get("/:id", validate("idParams"), eventController.getOneEvent)
eventRouter.post("/", uploadMiddleware("picture"), eventController.createEvent)
eventRouter.patch("/:id", uploadMiddleware("picture"), validate("idParams"), eventController.updateEvent)
eventRouter.delete("/:id", validate("idParams"), eventController.deleteEvent)

module.exports = eventRouter
