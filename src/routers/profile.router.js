const profileRouter = require("express").Router()
// const validate = require("../middlewares/validator.middleware")
const uploadMiddleware = require("../middlewares/upload.middleware")
// const authMiddleware = require("../middlewares/auth.middleware")
const profileController = require("../controllers/profile.controller")

profileRouter.post("/", uploadMiddleware("picture"), profileController.updateProfile)

module.exports = profileRouter
