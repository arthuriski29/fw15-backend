const profileModel = require("../../models/profile.model")
const errorHandler = require("../../helpers/errorHandler.helper")
// const argon = require("argon2")
const fileRemover = require("../../helpers/fileRemover.helper")

exports.getAllProfiles = async(request, response) => {
    try {
        const data = await profileModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search,
            request.query.sort, request.query.sortBy)
        if (data) {
            return response.json({
                success: true,
                message: "List of all users profile",
                results: data
            })
        }
    } catch (error) {
        return errorHandler(response, error)
    }  
}
    


exports.getOneProfile = async(request, response) => {
    const data = await profileModel.findOne(request.params.id)
    // console.log("Logged as user profile with id" + request.data.id )
    if(data){
        return response.json({
            success: true,
            message: "Detail user profile",
            results: data
        })
    }
    errorHandler(response, data)
}

exports.createProfile = async (request, response,) => {
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
        const profile = await profileModel.insert(data)
        return response.json({
            success: true,
            message: "Create user profile successfully",
            results: profile
        })
    } catch (error) {
        fileRemover(request.file)
        return errorHandler(response, error)
    } 
}

exports.updateProfile = async (request, response) => { //catatan diDS kang irul pakai try()-catch() buat ini. tapi yang ini udah worked
    try{
        const data ={
            ...request.body
        }
        // if(request.body.password) {
        //     data.password = await argon.hash(request.body.password)
        // }
        if(request.file){ //agar nama file yang diupload masuk ke dalam database
            data.picture = request.file.filename
        }
        const profile = await profileModel.update(request.params.id, data)
        if(!profile) {
            throw Error("update_profile_failed")
        }
        return response.json({
            success: true,
            message: "Update user profile successfully",
            results: profile
        })
    } catch(error){
        fileRemover(request.file)
        errorHandler(response, error)
    } 
    //cara sendiri  
    // const data = await profileModel.update(request.params.id, request.body)
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

exports.deleteProfile = async (request, response) => {
    try {
        const data = await profileModel.destroy(request.params.id)
        if(!data) {
            return errorHandler(response, undefined)
        }
        return response.json({
            success: true,
            message: "Delete user profile successfully",
            results: data
        })
      
    } catch (error) {
        return errorHandler(response, error)
    }

}
