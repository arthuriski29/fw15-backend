const wishlistRouter = require("express").Router()

const wishlistController = require("../../controllers/admin/wishlist.controller")
// const uploadMiddleware = require("../../middlewares/upload.middleware")
const validate = require("../../middlewares/validator.middleware")


wishlistRouter.get("/", wishlistController.getAllWishlist)
wishlistRouter.get("/:id", validate("idParams"), wishlistController.getOneWishlist)
wishlistRouter.post("/", wishlistController.createWishlist)
wishlistRouter.patch("/:id", validate("idParams"), wishlistController.updateWishlist)
wishlistRouter.delete("/:id", validate("idParams"), wishlistController.deleteReservation)

module.exports = wishlistRouter
