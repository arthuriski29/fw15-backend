const citiesRouter = require("express").Router()

const citiesController = require("../../controllers/admin/cities.controllers")
const uploadMiddleware = require("../../middlewares/upload.middleware")
const validate = require("../../middlewares/validator.middleware")


citiesRouter.get("/", validate("getAllCities"), citiesController.getAllCities)
citiesRouter.get("/:id", validate("idParams"), citiesController.getOneCity)
citiesRouter.post("/", uploadMiddleware("picture"), validate("createCity"), citiesController.createCity)
citiesRouter.patch("/:id", uploadMiddleware("picture"), validate("idParams"), validate("createCity"), citiesController.updateCities)
citiesRouter.delete("/:id", validate("idParams"), citiesController.deleteCity)

module.exports = citiesRouter
