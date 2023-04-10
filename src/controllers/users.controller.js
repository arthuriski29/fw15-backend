const userModel = require("../models/users.model")
const errorHandler = require("../helpers/errorHandler.helper")

exports.getAllUsers = async(request, response) => {
    const data = await userModel.findAll()
    if (data) {
        return response.json({
            success: true,
            message: "List of all users",
            results: data
        })
    }
    errorHandler(response, data)
    
}


exports.getOneUser = async(request, response) => {
    const data = await userModel.findOne(request.params.id)
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
        if (request.body.email == "" && request.body.password == "") {
            throw Error("empty_field")
        } 
        if (!request.body.email.includes("@")){
            throw Error("email_format")
        }
        const data = await userModel.insert(request.body)
        return response.json({
            success: true,
            message: `Create user ${request.body.email} successfully`,
            results: data
        })

    } catch (error) {
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
    errorHandler(response, data)
}

exports.deleteUser = async (request, response) => {
    try{
        const data = await userModel.destroy(request.params.id)
        return response.json({
            success: true,
            message: "Delete user successfully",
            results: data
        })

    }catch(error){
        errorHandler(response, error)

    }
}
