const profileModel = require("../models/profile.model")

exports.updateProfile = (request, response) => {
    const {id} = request.user
    const data = {
        ...request.body
    }
    if(request.file){
        data.picture = request.file.filename
    }
    const profile = profileModel.updateByUserId(id, request.body)
    if(!profile){
        throw Error("update_profile_failed")
    }
    return response.json({
        success: true,
        message: "Profile updated",
        results: profile
    })
}
