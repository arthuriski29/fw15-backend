const eventsRouter = require("express").Router()
const validate = require("../middlewares/validator.middleware")
const uploadMiddleware = require("../middlewares/upload.middleware")
// const authMiddleware = require("../middlewares/auth.middleware")
const eventsController = require("../controllers/events.controller")
const eventManageController = require("../controllers/events.manage.controller")

eventsRouter.get("/", eventsController.getAllEvents)
eventsRouter.get("/:id", validate("idParams"), eventsController.getOneEvent)
eventsRouter.post("/manage", uploadMiddleware("picture"), eventManageController.createEvents)
eventsRouter.patch("/manage/:id", uploadMiddleware("picture"), eventManageController.updateEvents)

module.exports = eventsRouter

