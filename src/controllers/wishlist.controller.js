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
        // const data ={
        //     ...req.body
        // }
        const checkWish = await wishlistModel.findByUserandEvent(id, eventId)
        if(checkWish){
            const delWish = await wishlistModel.destroyUser(id, eventId) 
            console.log(delWish)
            if(!delWish || undefined){
                throw Error("delete_wishlist_failed")
            }
            return res.json({
                success: false,
                message: `User ${event.createdBy} succesfully Deleted ${event.title} from wishlist`,
                results: delWish
            })
        }
        if(!checkWish){
            const addWish = await wishlistModel.insertWish(id, eventId)
            if(!addWish) {
                throw Error("no_wishlist_created")
            }
            if(addWish) {
                return res.json({
                    success: true,
                    message: `Event "${event.title}" Succesfully Added to Wishlist by user ${event.createdBy}`,
                    results: addWish
                })
            }
        }
    } catch (error) {
        return errorHandler(res, error)
    }
  
}

exports.checkWish = async(req, res) => {
    try {
        const {id} = req.user
        const {eventId} = req.query
        console.log(id, eventId)
        const checkWishlist = await wishlistModel.findByUserandEvent(id, eventId)
        console.log(checkWishlist)
        if(!checkWishlist){
            return res.json({
                success: false,
                message: `Wishlist for this event by user ${id} is not found`,
                results: false
            })
        }
        return res.json({
            success: true,
            message: ` Wishlist found by user ${id} for this event`,
            results: true
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

