const categoriesRouter = require("express").Router()

const categoriesController = require("../../controllers/admin/categories.controllers")
// const uploadMiddleware = require("../../middlewares/upload.middleware")
const validate = require("../../middlewares/validator.middleware")


categoriesRouter.get("/", categoriesController.getAllCategories)
categoriesRouter.get("/:id", validate("getOneCategory"), categoriesController.getOneCategories)
categoriesRouter.post("/", validate("createCategory"), categoriesController.createCategories)
categoriesRouter.patch("/:id", validate("updateCategory"), categoriesController.updateCategories)
categoriesRouter.delete("/:id", validate("deleteCategory"), categoriesController.deleteCategories)

module.exports = categoriesRouter
