const userModel = require("../models/users.model")

exports.getAllUsers = async(request, response) => {
    const data = await userModel.findAll()
    return response.json({
        success: true,
        message: "List of all users",
        results: data
    })
}

exports.createUser = (request, response) => {
    return response.json({
        success: true,
        message: `Create user ${request.body.fullName} successfully`
    })
}

exports.updateUser = (request, response) => {
    return response.json({
        success: true,
        message: `Update user ${request.params.id} successfully`
    })
}

exports.deleteUser = (request, response) => {
    return response.json({
        success: true,
        message: `Delete user ${request.params.id} successfully`
    })
}
