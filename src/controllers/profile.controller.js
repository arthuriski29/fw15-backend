const errorHandler = require("../helpers/errorHandler.helper")
const fileRemover = require("../helpers/fileRemover.helper")
const profileModel = require("../models/profile.model")
const userModel = require("../models/users.model")

exports.updateProfile = async(req, res) => {
    try {
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
        if(data.email){
            await userModel.update(id, data)
        }
        return res.json({
            success: true,
            message: "Profile updated",
            results: profile
      
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}
exports.getProfile = async (req, res) => {
    try {
        const {id} = req.user
        const profile = await profileModel.findOneByUserId(id)
        if(!profile){
            throw Error("profile_not_found")
        }
        return res.json({
            success: true,
            message: "Profile",
            results: profile
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}
