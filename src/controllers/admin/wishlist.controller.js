const wishlistModel = require("../../models/wishlist.model")
const errorHandler = require("../../helpers/errorHandler.helper")
// const argon = require("argon2")
// const fileRemover = require("../../helpers/fileRemover.helper")

exports.getAllWishlist = async(request, response) => {
    try {
        const data = await wishlistModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search,
            request.query.sort, request.query.sortBy)
        if (data) {
            return response.json({
                success: true,
                message: "List of all Wishlist",
                results: data
            })
        }
    } catch (error) {
        return errorHandler(response, error)
    }  
}
    


exports.getOneWishlist = async(request, response) => {
    const data = await wishlistModel.findOne(request.params.id)
    if(data){
        return response.json({
            success: true,
            message: "Detail of the Wishlist",
            results: data
        })
    }
    errorHandler(response, data)
}

exports.createWishlist = async (request, response,) => {
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
        const wishlist = await wishlistModel.insert(data)
        return response.json({
            success: true,
            message: "Created a Wishlist successfully",
            results: wishlist
        })
    } catch (error) {
        // fileRemover(request.file)
        return errorHandler(response, error)
    } 
}

exports.updateWishlist = async (request, response) => { //catatan diDS kang irul pakai try()-catch() buat ini. tapi yang ini udah worked
    try{
        const data ={
            ...request.body
        }
        // if(request.body.password) {
        //     data.password = await argon.hash(request.body.password)
        // }
        const wishlist = await wishlistModel.update(request.params.id, data)
        if(!wishlist) {
            throw Error("update_reservation_failed")
        }
        return response.json({
            success: true,
            message: "Update a Wishlist successfully",
            results: wishlist
        })
    } catch(error){
        errorHandler(response, error)
    } 
    //cara sendiri  
    // const data = await wishlist.update(request.params.id, request.body)
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

exports.deleteReservation = async (request, response) => {
    try {
        const data = await wishlistModel.destroy(request.params.id)
        if(!data) {
            return errorHandler(response, undefined)
        }
        return response.json({
            success: true,
            message: "Delete wishlist successfully",
            results: data
        })
      
    } catch (error) {
        return errorHandler(response, error)
    }

}
