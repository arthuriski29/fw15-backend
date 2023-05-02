const changePasswordRouter = require("express").Router()
const authMiddleware = require("../middlewares/auth.middleware")

const changePasswordController = require("../controllers/changePassword.controller")

changePasswordRouter.patch("/", authMiddleware, changePasswordController)



module.exports = changePasswordRouter
