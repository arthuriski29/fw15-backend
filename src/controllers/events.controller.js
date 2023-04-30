const errorHandler = require("../helpers/errorHandler.helper")
// const fileRemover = require("../helpers/fileRemover.helper")
const eventsModel = require("../models/events.model")

exports.getAllEvents = async (req, res) => {
    try {
        // const {id} = req.user
        const events = await eventsModel.findAll(
            req.query.page, 
            req.query.limit, 
            req.query.search,
            req.query.sort, 
            req.query.sortBy
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

exports.getOneEvent = async (req, res) => {
    const event = await eventsModel.findOneEvents(req.params.id)
    if(event){
        return res.json({
            success: true,
            message: "Detail Selected Event",
            results: event
        })
    }
    errorHandler(res, event)
}

// exports.createEvents = async(req, res) => {
//     try {
//         const {id} = req.user
//         const events = await eventsModel.findOneByeventsId(id)
//         console.log(events)
//         const data = {
//             ...req.body
//         }
//         if(req.file){
//             if(events.picture){
//                 console.log(events.picture)
//                 fileRemover({filename: events.picture})
//             }
//             data.picture = req.file.filename
//         }
//         const profile = await eventsModel.updateByUserId(id, data)
//         if(!profile){
//             throw Error("update_profile_failed")
//         }
//         return res.json({
//             success: true,
//             message: "Profile updated",
//             results: profile
    
//         })
//     } catch (error) {
//         return errorHandler(res, error)
//     }
// }
// exports.updateEvents = async(req, res) => {
//     try {
//         const {id} = req.user
//         const events = await eventsModel.findOneByeventsId(id)
//         console.log(events)
//         const data = {
//             ...req.body
//         }
//         if(req.file){
//             if(events.picture){
//                 console.log(events.picture)
//                 fileRemover({filename: events.picture})
//             }
//             data.picture = req.file.filename
//         }
//         const profile = await eventsModel.updateByUserId(id, data)
//         if(!profile){
//             throw Error("update_profile_failed")
//         }
//         return res.json({
//             success: true,
//             message: "Profile updated",
//             results: profile
    
//         })
//     } catch (error) {
//         return errorHandler(res, error)
//     }
// }
