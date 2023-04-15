const resSectionsModel = require("../../models/reservationSections.model")
const errorHandler = require("../../helpers/errorHandler.helper")
// const argon = require("argon2")
// const fileRemover = require("../../helpers/fileRemover.helper")

exports.getAllResSections = async(request, response) => {
    try {
        const data = await resSectionsModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search,
            request.query.sort, request.query.sortBy)
        if (data) {
            return response.json({
                success: true,
                message: "List of all Reservation Section",
                results: data
            })
        }
    } catch (error) {
        return errorHandler(response, error)
    }  
}
    


exports.getOneResSections = async(request, response) => {
    const data = await resSectionsModel.findOne(request.params.id)
    if(data){
        return response.json({
            success: true,
            message: "Detail of the Reservation Section",
            results: data
        })
    }
    errorHandler(response, data)
}

exports.createResSections = async (request, response,) => {
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
        const resSections = await resSectionsModel.insert(data)
        return response.json({
            success: true,
            message: "Created a Reservation Section successfully",
            results: resSections
        })
    } catch (error) {
        // fileRemover(request.file)
        return errorHandler(response, error)
    } 
}

exports.updateResSections = async (request, response) => { //catatan diDS kang irul pakai try()-catch() buat ini. tapi yang ini udah worked
    try{
        const data ={
            ...request.body
        }
        // if(request.body.password) {
        //     data.password = await argon.hash(request.body.password)
        // }
        const resSections = await resSectionsModel.update(request.params.id, data)
        if(!resSections) {
            throw Error("update_reservationsection_failed")
        }
        return response.json({
            success: true,
            message: "Update a Reservation Section successfully",
            results: resSections
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

exports.deleteResSections = async (request, response) => {
    try {
        const data = await resSectionsModel.destroy(request.params.id)
        if(!data) {
            return errorHandler(response, undefined)
        }
        return response.json({
            success: true,
            message: "Delete Reservation section successfully",
            results: data
        })
      
    } catch (error) {
        return errorHandler(response, error)
    }

}
