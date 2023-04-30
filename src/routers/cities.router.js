const citiesRouter = require("express").Router()
const validate = require("../middlewares/validator.middleware")
// const uploadMiddleware = require("../middlewares/upload.middleware")
// const authMiddleware = require("../middlewares/auth.middleware")
const citiesController = require("../controllers/cities.controller")

citiesRouter.get("/", citiesController.getAllCities)
citiesRouter.get("/:id", validate("idParams"), citiesController.getOneCities)


module.exports = citiesRouter

