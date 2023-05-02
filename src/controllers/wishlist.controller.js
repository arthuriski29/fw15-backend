const errorHandler = require("../helpers/errorHandler.helper")
const wishlistModel = require("../models/wishlist.model")
const eventsModel = require("../models/events.model")
// const userModel = require("../models/users.model")

exports.createWish = async(req, res) => {
    try {
        const {id} = req.user
        const {eventId} = req.body
        const event = await eventsModel.findOne(eventId)
        // console.log(eventId)
        if (!event){
            throw Error("event_invalid")
        }
        const data ={
            ...req.body
        }
        const wish = await wishlistModel.insertWish(id, data)
        if(!wish) {
            throw Error("no_wishlist_created")
        }
        return res.json({
            success: true,
            message: "Add Wishlist successfully",
            results: wish
        })
    } catch (error) {
        return errorHandler(res, error)
    }
  
}

exports.getWish = async(req, res) => {
    try {
        const {id} = req.user
        const wishlist = await wishlistModel.findAllByUser(id)
        if(!wishlist){
            throw Error("get_wishlist_failed")
        }
        return res.json({
            success: true,
            message: "All Wishlist Saved",
            results: wishlist
      
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

