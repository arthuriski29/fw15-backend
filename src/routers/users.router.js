const userRouter = require("express").Router()

const userController = require("../controllers/users.controller")
const validate = require("../middlewares/validator.middleware")

userRouter.get("/", userController.getAllUsers)
userRouter.get("/:id", userController.getOneUser)
userRouter.post("/", validate("createUser"), userController.createUser)
userRouter.patch("/:id", userController.updateUser)
userRouter.delete("/:id", userController.deleteUser)

module.exports = userRouter
