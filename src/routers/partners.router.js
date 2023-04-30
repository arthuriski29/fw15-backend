const partnersRouter = require("express").Router()
const validate = require("../middlewares/validator.middleware")
// const uploadMiddleware = require("../middlewares/upload.middleware")
// const authMiddleware = require("../middlewares/auth.middleware")
const partnersController = require("../controllers/partners.controller")

partnersRouter.get("/", partnersController.getAllPartners)
partnersRouter.get("/:id", validate("idParams"), partnersController.getOnePartners)


module.exports = partnersRouter
