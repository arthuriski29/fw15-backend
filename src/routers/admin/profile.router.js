const profileRouter = require("express").Router()

const profileController = require("../../controllers/admin/profile.controller")
const uploadMiddleware = require("../../middlewares/upload.middleware")
const validate = require("../../middlewares/validator.middleware")


profileRouter.get("/", validate("getAllprofiles"), profileController.getAllprofiles)
profileRouter.get("/:id", validate("idParams"), profileController.getOneprofile)
profileRouter.post("/", uploadMiddleware("picture"), validate("createprofile"), profileController.createprofile)
profileRouter.patch("/:id", uploadMiddleware("picture"), validate("idParams"), validate("createprofile"), profileController.updateprofile)
profileRouter.delete("/:id", validate("idParams"), profileController.deleteprofile)

module.exports = profileRouter
