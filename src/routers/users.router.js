const userRouter = require("express").Router()

const userController = require("../controllers/users.controller")
const uploadMiddleware = require("../middlewares/upload.middleware")
const validate = require("../middlewares/validator.middleware")


userRouter.get("/", userController.getAllUsers)
userRouter.get("/:id", userController.getOneUser)
userRouter.post("/", uploadMiddleware("picture"), validate("createUser"), userController.createUser)
userRouter.patch("/:id", uploadMiddleware("picture"), validate("createUser"), userController.updateUser)
userRouter.delete("/:id", userController.deleteUser)

module.exports = userRouter
