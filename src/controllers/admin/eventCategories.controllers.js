const eventCategoriesModel = require("../../models/eventCategories.model")
const errorHandler = require("../../helpers/errorHandler.helper")
// const argon = require("argon2")
// const fileRemover = require("../../helpers/fileRemover.helper")

exports.getAllEvCategories = async(request, response) => {
    try {
        const data = await eventCategoriesModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search,
            request.query.sort, request.query.sortBy)
        if (data) {
            return response.json({
                success: true,
                message: "List of all Event Categories",
                results: data
            })
        }
    } catch (error) {
        return errorHandler(response, error)
    }  
}
    


exports.getOneEvCategories = async(request, response) => {
    const data = await eventCategoriesModel.findOne(request.params.id)
    if(data){
        return response.json({
            success: true,
            message: "Detail event categories",
            results: data
        })
    }
    errorHandler(response, data)
}

exports.createEvCategories = async (request, response,) => {
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
        const eventCategories = await eventCategoriesModel.insert(data)
        return response.json({
            success: true,
            message: "Create event categories successfully",
            results: eventCategories
        })
    } catch (error) {
        // fileRemover(request.file)
        return errorHandler(response, error)
    } 
}

exports.updateEvCategories = async (request, response) => { //catatan diDS kang irul pakai try()-catch() buat ini. tapi yang ini udah worked
    try{
        const data ={
            ...request.body
        }
        // if(request.body.password) {
        //     data.password = await argon.hash(request.body.password)
        // }
        const eventCategories = await eventCategoriesModel.update(request.params.id, data)
        if(!eventCategories) {
            throw Error("update_evCategories_failed")
        }
        return response.json({
            success: true,
            message: "Update Event Categories successfully",
            results: eventCategories
        })
    } catch(error){
        errorHandler(response, error)
    } 
    //cara sendiri  
    // const data = await eventCategoriesModel.update(request.params.id, request.body)
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

exports.deleteEvCategories = async (request, response) => {
    try {
        const data = await eventCategoriesModel.destroy(request.params.id)
        if(!data) {
            return errorHandler(response, undefined)
        }
        return response.json({
            success: true,
            message: "Delete event categories successfully",
            results: data
        })
      
    } catch (error) {
        return errorHandler(response, error)
    }

}
