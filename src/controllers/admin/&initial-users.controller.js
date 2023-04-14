const userModel = require("../../models/users.model")
const errorHandler = require("../../helpers/errorHandler.helper")
const argon = require("argon2")
const fileRemover = require("../../helpers/fileRemover.helper")

exports.getAllUsers = async(request, response) => {
    try {
        const data = await userModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search,
            request.query.sort, request.query.sortBy)
        if (data) {
            return response.json({
                success: true,
                message: "List of all users",
                results: data
            })
        }
    } catch (error) {
        return errorHandler(response, error)
    }  
}
    


exports.getOneUser = async(request, response) => {
    const data = await userModel.findOne(request.params.id)
    console.log("Logged as user with id" +request.user.id)
    if(data){
        return response.json({
            success: true,
            message: "Detail user",
            results: data
        })
    }
    errorHandler(response, data)
}

exports.createUser = async (request, response,) => {
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
        const hash = await argon.hash(request.body.password)
        const data = {
            ...request.body,
            password: hash
        }
        if(request.file){ //agar nama file yang diupload masuk ke dalam database
            data.picture = request.file.filename
        }
        const user = await userModel.insert(data)
        return response.json({
            success: true,
            message: `Create user ${request.body.email} successfully`,
            results: user
        })
    } catch (error) {
        fileRemover(request.file)
        return errorHandler(response, error)
    } 
}

exports.updateUser = async (request, response) => {
    const data = await userModel.update(request.params.id, request.body)
    if(data) {
        return response.json({
            success: true,
            message: "Update user successfully",
            results: data
        })
    }
    fileRemover(request.file)
    errorHandler(response, data)
}

exports.deleteUser = async (request, response) => {
    try {
        const data = await userModel.destroy(request.params.id)
        if(!data) {
            return errorHandler(response, undefined)
        }
        return response.json({
            success: true,
            message: "Delete user successfully",
            results: data
        })
      
    } catch (error) {
        return errorHandler(response, error)
    }

}
