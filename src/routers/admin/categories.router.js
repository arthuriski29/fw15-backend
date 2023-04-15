const categoriesRouter = require("express").Router()

const categoriesController = require("../../controllers/admin/categories.controllers")
// const uploadMiddleware = require("../../middlewares/upload.middleware")
const validate = require("../../middlewares/validator.middleware")


categoriesRouter.get("/", categoriesController.getAllCategories)
categoriesRouter.get("/:id", validate("idParams"), categoriesController.getOneCategories)
categoriesRouter.post("/", categoriesController.createCategories)
categoriesRouter.patch("/:id", validate("idParams"), categoriesController.updateCategories)
categoriesRouter.delete("/:id", validate("idParams"), categoriesController.deleteCategories)

module.exports = categoriesRouter
