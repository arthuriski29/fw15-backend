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
            data.picture = req.file.filename
        }
        const create = await eventsModel.insertMyEvents(id, data)
        if(!create) {
            throw Error("no_event_created")
        }
        return res.json({
            success: true,
            message: "Create Events successfully",
            results: create
        })
    } catch (error) {
        return errorHandler(res, error)
    }
  
}

exports.updateEvents = async(req, res) => {
    try {
        const {id} = req.user
        // const user = await profileModel.findOneByUserId(id)
        const event = await eventCategoriesModel.findOneByUserId(id)
        console.log(event)
        const data = {
            ...req.body
        }
        if(req.file){
            if(event.picture){
                console.log(event.picture)
                fileRemover({filename: event.picture})
            }
            data.picture = req.file.filename
        }
        const create = await eventsModel.updateByUser(id, data)
        if(!create){
            throw Error("update_event_failed")
        }
        // if(data.email){
        //     await userModel.update(id, data)
        // }
        return res.json({
            success: true,
            message: "Event updated",
            results: create
      
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

