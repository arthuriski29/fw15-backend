const resTicketsModel = require("../../models/reservationTickets.model")
const errorHandler = require("../../helpers/errorHandler.helper")
// const argon = require("argon2")
// const fileRemover = require("../../helpers/fileRemover.helper")

exports.getAllResTickets = async(request, response) => {
    try {
        const data = await resTicketsModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search,
            request.query.sort, request.query.sortBy)
        if (data) {
            return response.json({
                success: true,
                message: "List of all Reservation Tickets",
                results: data
            })
        }
    } catch (error) {
        return errorHandler(response, error)
    }  
}
    


exports.getOneResTickets = async(request, response) => {
    const data = await resTicketsModel.findOne(request.params.id)
    if(data){
        return response.json({
            success: true,
            message: "Detail of the Reservation Ticket",
            results: data
        })
    }
    errorHandler(response, data)
}

exports.createResTickets = async (request, response,) => {
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
        // if(request.file){ //agar nama file yang diupload masuk ke dalam database
        //     data.picture = request.file.filename
        // }
        const resTickets = await resTicketsModel.insert(data)
        return response.json({
            success: true,
            message: "Created a Reservation Ticket successfully",
            results: resTickets
        })
    } catch (error) {
        // fileRemover(request.file)
        return errorHandler(response, error)
    } 
}

exports.updateResTickets = async (request, response) => { //catatan diDS kang irul pakai try()-catch() buat ini. tapi yang ini udah worked
    try{
        const data ={
            ...request.body
        }
        // if(request.body.password) {
        //     data.password = await argon.hash(request.body.password)
        // }
        const resTickets = await resTicketsModel.update(request.params.id, data)
        if(!resTickets) {
            throw Error("update_reservationTickets_failed")
        }
        return response.json({
            success: true,
            message: "Update a Reservation Ticket successfully",
            results: resTickets
        })
    } catch(error){
        errorHandler(response, error)
    } 
    //cara sendiri  
    // const data = await reservations.update(request.params.id, request.body)
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

exports.deleteResTickets = async (request, response) => {
    try {
        const data = await resTicketsModel.destroy(request.params.id)
        if(!data) {
            return errorHandler(response, undefined)
        }
        return response.json({
            success: true,
            message: "Delete Reservations Ticket successfully",
            results: data
        })
      
    } catch (error) {
        return errorHandler(response, error)
    }

}
