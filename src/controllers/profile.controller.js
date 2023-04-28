const fileRemover = require("../helpers/fileRemover.helper")
const profileModel = require("../models/profile.model")

exports.updateProfile = async(req, res) => {
    const {id} = req.user
    const user = await profileModel.findOneByUserId(id)
    console.log(user)
    const data = {
        ...req.body
    }
    if(req.file){
        if(user.picture){
            console.log(user.picture)
            fileRemover({filename: user.picture})
        }
        data.picture = req.file.filename
    }
    const profile = await profileModel.updateByUserId(id, data)
    if(!profile){
        throw Error("update_profile_failed")
    }
    return res.json({
        success: true,
        message: "Profile updated",
        results: profile
      
    })
}
