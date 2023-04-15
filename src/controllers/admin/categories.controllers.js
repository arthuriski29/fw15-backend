const categoriesModel = require("../../models/categories.model")
const errorHandler = require("../../helpers/errorHandler.helper")
// const argon = require("argon2")
// const fileRemover = require("../../helpers/fileRemover.helper")

exports.getAllCategories = async(request, response) => {
    try {
        const data = await categoriesModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search,
            request.query.sort, request.query.sortBy)
        if (data) {
            return response.json({
                success: true,
                message: "List of all Categories",
                results: data
            })
        }
    } catch (error) {
        return errorHandler(response, error)
    }  
}
    


exports.getOneCategories = async(request, response) => {
    const data = await categoriesModel.findOne(request.params.id)
    if(data){
        return response.json({
            success: true,
            message: "Detail of the categories",
            results: data
        })
    }
    errorHandler(response, data)
}

exports.createCategories = async (request, response,) => {
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
        const categories = await categoriesModel.insert(data)
        return response.json({
            success: true,
            message: "Created categories successfully",
            results: categories
        })
    } catch (error) {
        // fileRemover(request.file)
        return errorHandler(response, error)
    } 
}

exports.updateCategories = async (request, response) => { //catatan diDS kang irul pakai try()-catch() buat ini. tapi yang ini udah worked
    try{
        const data ={
            ...request.body
        }
        // if(request.body.password) {
        //     data.password = await argon.hash(request.body.password)
        // }
        const categories = await categoriesModel.update(request.params.id, data)
        if(!categories) {
            throw Error("update_categories_failed")
        }
        return response.json({
            success: true,
            message: "Update Categories successfully",
            results: categories
        })
    } catch(error){
        errorHandler(response, error)
    } 
    //cara sendiri  
    // const data = await categories.update(request.params.id, request.body)
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

exports.deleteCategories = async (request, response) => {
    try {
        const data = await categoriesModel.destroy(request.params.id)
        if(!data) {
            return errorHandler(response, undefined)
        }
        return response.json({
            success: true,
            message: "Delete categories successfully",
            results: data
        })
      
    } catch (error) {
        return errorHandler(response, error)
    }

}
