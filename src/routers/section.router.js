const sectionRouter = require("express").Router()
// const validate = require("../middlewares/validator.middleware")
// const authMiddleware = require("../middlewares/auth.middleware")
const sectionController = require("../controllers/section.controller")

// sectionRouter.get("/", sectionController.getWish)
sectionRouter.get("/", sectionController.getAllSections)

module.exports = sectionRouter
