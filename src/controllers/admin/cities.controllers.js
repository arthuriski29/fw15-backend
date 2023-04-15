const citiesModel = require("../../models/cities.model")
const errorHandler = require("../../helpers/errorHandler.helper")
// const argon = require("argon2")
const fileRemover = require("../../helpers/fileRemover.helper")

exports.getAllCities = async(request, response) => {
    try {
        const data = await citiesModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search,
            request.query.sort, request.query.sortBy)
        if (data) {
            return response.json({
                success: true,
                message: "List of all City",
                results: data
            })
        }
    } catch (error) {
        return errorHandler(response, error)
    }  
}
    


exports.getOneCity = async(request, response) => {
    const data = await citiesModel.findOne(request.params.id)
    if(data){
        return response.json({
            success: true,
            message: "Detail user city",
            results: data
        })
    }
    errorHandler(response, data)
}

exports.createCity = async (request, response,) => {
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
        const cities = await citiesModel.insert(data)
        return response.json({
            success: true,
            message: "Create user City successfully",
            results: cities
        })
    } catch (error) {
        fileRemover(request.file)
        return errorHandler(response, error)
    } 
}

exports.updateCities = async (request, response) => { //catatan diDS kang irul pakai try()-catch() buat ini. tapi yang ini udah worked
    try{
        const data ={
            ...request.body
        }
        // if(request.body.password) {
        //     data.password = await argon.hash(request.body.password)
        // }
        const cities = await citiesModel.update(request.params.id, data)
        if(!cities) {
            throw Error("update_cities_failed")
        }
        return response.json({
            success: true,
            message: "Update City user successfully",
            results: cities
        })
    } catch(error){
        fileRemover(request.file)
        errorHandler(response, error)
    } 
    //cara sendiri  
    // const data = await citiesModel.update(request.params.id, request.body)
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

exports.deleteCity = async (request, response) => {
    try {
        const data = await citiesModel.destroy(request.params.id)
        if(!data) {
            return errorHandler(response, undefined)
        }
        return response.json({
            success: true,
            message: "Delete City user successfully",
            results: data
        })
      
    } catch (error) {
        return errorHandler(response, error)
    }

}
