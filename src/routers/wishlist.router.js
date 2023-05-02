const wishlistRouter = require("express").Router()
// const validate = require("../middlewares/validator.middleware")
// const authMiddleware = require("../middlewares/auth.middleware")
const wishlistController = require("../controllers/wishlist.controller")

wishlistRouter.get("/", wishlistController.getWish)
wishlistRouter.post("/", wishlistController.createWish)

module.exports = wishlistRouter
