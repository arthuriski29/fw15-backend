const evCategoriesRouter = require("express").Router()

const eventCategoriesController = require("../../controllers/admin/eventCategories.controllers")
// const uploadMiddleware = require("../../middlewares/upload.middleware")
const validate = require("../../middlewares/validator.middleware")


evCategoriesRouter.get("/", eventCategoriesController.getAllEvCategories)
evCategoriesRouter.get("/:id", validate("idParams"), eventCategoriesController.getOneEvCategories)
evCategoriesRouter.post("/", eventCategoriesController.createEvCategories)
evCategoriesRouter.patch("/:id", validate("idParams"), eventCategoriesController.updateEvCategories)
evCategoriesRouter.delete("/:id", validate("idParams"), eventCategoriesController.deleteEvCategories)

module.exports = evCategoriesRouter
