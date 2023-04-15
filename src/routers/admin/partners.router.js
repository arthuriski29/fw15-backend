const partnersRouter = require("express").Router()

const partnersController = require("../../controllers/admin/partners.controllers")
const uploadMiddleware = require("../../middlewares/upload.middleware")
const validate = require("../../middlewares/validator.middleware")

//niru city soalnya model sama 
partnersRouter.get("/", validate("getAllCities"), partnersController.getAllPartners)
partnersRouter.get("/:id", validate("idParams"), partnersController.getOnePartner)
partnersRouter.post("/", uploadMiddleware("picture"), validate("createCity"), partnersController.createPartner)
partnersRouter.patch("/:id", uploadMiddleware("picture"), validate("idParams"), validate("createCity"), partnersController.updatePartner)
partnersRouter.delete("/:id", validate("idParams"), partnersController.deletePartner)

module.exports = partnersRouter
