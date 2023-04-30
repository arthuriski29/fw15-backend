const eventsRouter = require("express").Router()
const validate = require("../middlewares/validator.middleware")
// const uploadMiddleware = require("../middlewares/upload.middleware")
// const authMiddleware = require("../middlewares/auth.middleware")
const eventsController = require("../controllers/events.controller")

eventsRouter.get("/", eventsController.getAllEvents)
eventsRouter.get("/:id", validate("idParams"), eventsController.getOneEvent)
// eventsRouter.post("/manage", uploadMiddleware("picture"), validate("createEvents"), eventsController.getOneEvent)
// eventsRouter.patch("/manage", uploadMiddleware("picture"), validate("createEvents"), eventsController.getOneEvent)

module.exports = eventsRouter

