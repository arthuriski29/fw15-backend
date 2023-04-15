const reservationsModel = require("../../models/reservations.model")
const errorHandler = require("../../helpers/errorHandler.helper")
// const argon = require("argon2")
// const fileRemover = require("../../helpers/fileRemover.helper")

exports.getAllReservations = async(request, response) => {
    try {
        const data = await reservationsModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search,
            request.query.sort, request.query.sortBy)
        if (data) {
            return response.json({
                success: true,
                message: "List of all Reservations",
                results: data
            })
        }
    } catch (error) {
        return errorHandler(response, error)
    }  
}
    


exports.getOneReservation = async(request, response) => {
    const data = await reservationsModel.findOne(request.params.id)
    if(data){
        return response.json({
            success: true,
            message: "Detail of the Reservation",
            results: data
        })
    }
    errorHandler(response, data)
}

exports.createReservation = async (request, response,) => {
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
        const reservations = await reservationsModel.insert(data)
        return response.json({
            success: true,
            message: "Created a Reservation successfully",
            results: reservations
        })
    } catch (error) {
        // fileRemover(request.file)
        return errorHandler(response, error)
    } 
}

exports.updateReservation = async (request, response) => { //catatan diDS kang irul pakai try()-catch() buat ini. tapi yang ini udah worked
    try{
        const data ={
            ...request.body
        }
        // if(request.body.password) {
        //     data.password = await argon.hash(request.body.password)
        // }
        const reservations = await reservationsModel.update(request.params.id, data)
        if(!reservations) {
            throw Error("update_reservation_failed")
        }
        return response.json({
            success: true,
            message: "Update a Reservation successfully",
            results: reservations
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

exports.deleteReservation = async (request, response) => {
    try {
        const data = await reservationsModel.destroy(request.params.id)
        if(!data) {
            return errorHandler(response, undefined)
        }
        return response.json({
            success: true,
            message: "Delete reservations successfully",
            results: data
        })
      
    } catch (error) {
        return errorHandler(response, error)
    }

}
