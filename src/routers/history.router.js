const historyRouter = require("express").Router()
// const validate = require("../middlewares/validator.middleware")
// const authMiddleware = require("../middlewares/auth.middleware")
const historyController = require("../controllers/history.controller")

// historyRouter.get("/", historyController.getWish)
historyRouter.get("/", historyController.getAllHistory)

module.exports = historyRouter
