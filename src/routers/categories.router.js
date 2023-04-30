const categoriesRouter = require("express").Router()
const validate = require("../middlewares/validator.middleware")
// const uploadMiddleware = require("../middlewares/upload.middleware")
// const authMiddleware = require("../middlewares/auth.middleware")
const categoriesController = require("../controllers/categories.controller")

categoriesRouter.get("/", categoriesController.getAllCategories)
categoriesRouter.get("/:id", validate("idParams"), categoriesController.getOneCategories)


module.exports = categoriesRouter

