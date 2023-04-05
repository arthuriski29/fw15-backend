const userModel = require("../models/users.model")

exports.getAllUsers = async(request, response) => {
    const data = await userModel.findAll()
    return response.json({
        success: true,
        message: "List of all users",
        results: data
    })
}

exports.getOneUser = async(request, response) => {
    const data = await userModel.findOne(request.params.id)
    if(data){
        return response.json({
            success: true,
            message: "Detail users",
            results: data
        })
    }
    return response.status(404).json({
        success: false,
        message: "Error: user not found",
    })
}

exports.createUser = async (request, response,) => {
    try {
        const data = await userModel.insert(request.body)
        return response.json({
            success: true,
            message: `Create user ${request.body.email} successfully`,
            results: data
        })
    
    } catch (error) {
        return response.status(404).json({
            success: false,
            message: `User with email ${request.body.email} had been created !`
        })
    }
}

exports.updateUser = async (request, response) => {
    const data = await userModel.update(request.params.id, request.body)
    return response.json({
        success: true,
        message: "Update user successfully",
        results: data
    })
}

exports.deleteUser = async (request, response) => {
    const data = await userModel.destroy(request.params.id)
    return response.json({
        success: true,
        message: "Delete user successfully",
        results: data
    })
}
