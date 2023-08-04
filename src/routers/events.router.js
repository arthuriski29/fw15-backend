const eventsRouter = require("express").Router()
const validate = require("../middlewares/validator.middleware")
const uploadMiddleware = require("../middlewares/upload.middleware")
const authMiddleware = require("../middlewares/auth.middleware")
const eventsController = require("../controllers/events.controller")
const eventManageController = require("../controllers/events.manage.controller")

eventsRouter.get("/", eventsController.getAllEvents)
eventsRouter.get("/manage", authMiddleware, eventManageController.getAllUserEvents)
eventsRouter.get("/manage/:id", authMiddleware, eventManageController.getOneUserEvent)
eventsRouter.get("/:id", validate("idParams"), eventsController.getOneEvent)
eventsRouter.post("/manage", uploadMiddleware("picture"), authMiddleware, eventManageController.createEvents)
eventsRouter.patch("/manage/:id", uploadMiddleware("picture"), authMiddleware, eventManageController.updateEvents)
eventsRouter.delete("/manage/:id", uploadMiddleware("picture"), authMiddleware, eventManageController.deleteEvents)

module.exports = eventsRouter

