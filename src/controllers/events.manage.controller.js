const errorHandler = require("../helpers/errorHandler.helper")
const fileRemover = require("../helpers/fileRemover.helper")
const eventsModel = require("../models/events.model")
const eventCategoriesModel = require("../models/eventCategories.model")
// const userModel = require("../models/users.model")

exports.createEvents = async(req, res) => {
    try {
        const {id} = req.user
        // const user = await eventsModel.insertMyEvents(id, data)
        // console.log(user)
        const data ={
            ...req.body
        }

        if(req.file){ 
            data.picture = req.file.path
        }
        const create = await eventsModel.insertMyEvents(id, data)
        const eventId =  create.id
        const intoCategory = await eventCategoriesModel.insertCategory(eventId, data)
        if(!intoCategory) {
            throw Error("no_category_event")
        }
        if(!create) {
            throw Error("no_event_created")
        }
        return res.json({
            success: true,
            message: "Create Events successfully",
            results: [create, intoCategory]
        })
    } catch (error) {
        return errorHandler(res, error)
    }
  
}

exports.updateEvents = async(req, res) => {
    try {
        const {id} = req.user
        const eventId = req.params.id
        const data = {
            ...req.body,
        }
               
        const event = await eventCategoriesModel.findAllByUserId(id)

        if(req.file){
            if(event.picture){
                // console.log(event.picture)
                fileRemover({filename: event.picture})
            }
            data.picture = req.file.path
        }
        const update = await eventsModel.update(eventId, data)
        console.log(update.picture)
    
        const updateCat = await eventCategoriesModel.update(eventId, data.categoryId)
        console.log(updateCat)
        console.log(updateCat.categoryId)
        if(!update){
            throw Error("update_event_failed")
        }
        if(!updateCat){
            throw Error("update_category_event_failed")
        }
        
        const results = await eventCategoriesModel.findOneById(eventId)
        const allResults = {
            ...results,
            picture:update.picture
        }
      
        return res.json({
            success: true,
            message: "Event updated",
            results: allResults
      
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}
exports.deleteEvents = async(req, res) => {
    try {
        const {id} = req.user
        // const user = await profileModel.findOneByUserId(id)
        // const event = await eventsModel.findOneByUserId(id)
        // console.log(event)
        const data = {
            ...req.params
        }
        
        const destroyEvent = await eventsModel.destroyByUser(id, data.id)
        console.log({id})
        
        if(!destroyEvent){
            throw Error("delete_event_failed")
        }
        if(destroyEvent){
            const destroyCategory = await eventCategoriesModel.destroyByUser(data.id)
            if(!destroyCategory){
                throw Error("delete_eventCat_failed")
            }
        }
        // if(data.email){
        //     await userModel.update(id, data)
        // }
        return res.json({
            success: true,
            message: "Event deleted succesfully",
            results: destroyEvent
      
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

exports.getAllUserEvents = async (req, res) => {
    try {
        const {id} = req.user
        const events = await eventsModel.findAllUserMade(
            id,
            req.query.page, 
            req.query.limit, 
            req.query.search,
            req.query.sort, 
            req.query.sortBy,
            req.query.location,
            req.query.category
        )
        if(!events){
            throw Error("events_not_found")
        }
        return res.json({
            success: true,
            message: "List of All Events",
            results: events
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

