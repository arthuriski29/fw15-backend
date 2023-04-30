const eventModel = require("../../models/events.model")
const errorHandler = require("../../helpers/errorHandler.helper")
// const argon = require("argon2")
const fileRemover = require("../../helpers/fileRemover.helper")

exports.getAllEvents = async(request, response) => {
    try {
        const data = await eventModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search,
            request.query.sort, request.query.sortBy
        )
        if (data) {
            return response.json({
                success: true,
                message: "List of all events",
                results: data
            })
        }
    } catch (error) {
        return errorHandler(response, error)
    }  
}
    


exports.getOneEvent = async(request, response) => {
    const data = await eventModel.findOne(request.params.id)
    if(data){
        return response.json({
            success: true,
            message: "Detail Event user",
            results: data
        })
    }
    errorHandler(response, data)
}

exports.createEvent = async (request, response,) => {
    try {
        // if ((request.body.email == "" || request.body.password == "") ||(request.body.email == null || request.body.password == null)) {
        //     throw Error("empty_field")
        // } 
        // if ( request.body.fullName == "" || request.body.fullName == null || request.body.fullName == undefined ) {
        //     throw Error("name_empty_field")
        // } 
        // if (!request.body.email.includes("@")){
        //     throw Error("email_format")
        // }
        // const hash = await argon.hash(request.body.password)
        const data = {
            ...request.body
            // password: hash
        }
        if(request.file){ //agar nama file yang diupload masuk ke dalam database
            data.picture = request.file.filename
        }
        const events = await eventModel.insert(data)
        return response.json({
            success: true,
            message: "Create user Event successfully",
            results: events
        })
    } catch (error) {
        fileRemover(request.file)
        return errorHandler(response, error)
    } 
}

exports.updateEvent = async (request, response) => { //catatan diDS kang irul pakai try()-catch() buat ini. tapi yang ini udah worked
    try{
        const data ={
            ...request.body
        }
        if(request.file){ //agar nama file yang diupload masuk ke dalam database
            data.picture = request.file.filename
        }
        const events = await eventModel.update(request.params.id, data)
        if(!events) {
            throw Error("update_events_failed")
        }
        return response.json({
            success: true,
            message: "Update events successfully",
            results: events
        })
    } catch(error){
        fileRemover(request.file)
        errorHandler(response, error)
    } 
    //cara sendiri  
    // const data = await eventModel.update(request.params.id, request.body)
    // if(data) {
    //     return response.json({
    //         success: true,
    //         message: "Update user successfully",
    //         results: data
    //     })
    // }
    // // fileRemover(request.file)
    // errorHandler(response, data)
}

exports.deleteEvent = async (request, response) => {
    try {
        const data = await eventModel.destroy(request.params.id)
        if(!data) {
            return errorHandler(response, undefined)
        }
        return response.json({
            success: true,
            message: "Delete Event successfully",
            results: data
        })
      
    } catch (error) {
        return errorHandler(response, error)
    }

}
