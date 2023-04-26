const errorHandler = (response, error) => {
    // if(error?.message === "validation"){
    //     return response.status(400).json({
    //         success: false,
    //         message: "Error: email already used"
    //     })
    // }
    if (error?.message?.includes("duplicate key")) {
        return response.status(409).json({
            success: false,
            message: "Error: Email already exist !"
        })
    }
    if(error?.message?.includes("jwt malformed")) {
        console.log(error)
        return response.status(401).json({
            success: false, 
            message: "Token is invalid"
        })
    }
    if(error?.message?.includes("invalid signature")) {
        
        return response.status(401).json({
            success: false, 
            message: "Token signature is invalid"
        })
    }
    if(error?.message?.includes("name_empty_field")) {
      
        return response.status(400).json({
            success: false, 
            message: "Name cannot be empty"
        })
    }
    if(error?.message?.includes("update_user_failed")) { //cara kang irul di validator untuk controller update
        return response.status(400).json({
            success: false,
            message: "Id is not found"
        })
    }
    if(error === undefined) {
        return response.status(404).json({
            success: false,
            message: "Error: user not found"
        })
    }
    
    if(error?.message?.includes("empty_field")) {
      
        return response.status(400).json({
            success: false, 
            message: "Email or password cannot be empty"
        })
    }
    if(error?.message?.includes("email_format")) {
      
        return response.status(400).json({
            success: false, 
            message: "Wrong email format"
        })
    }
    if(error?.message?.includes("wrong_credentials")) {
        return response.status(401).json({
            success: false, 
            message: "Wrong email or password"
        })
    }
    if(error?.message?.includes("no_user")) {
        return response.status(400).json({
            success: false, 
            message: "Email haven't registered"
        })
    }
    if(error?.message?.includes("password_unmatch")) {
        return response.status(400).json({
            success: false, 
            message: "Password and Confirm Password unmatched"
        })
    }
    if(error?.message?.includes("no_forgots_requested")) {
        return response.status(400).json({
            success: false, 
            message: "Cant' find Email or Code requested"
        })
    }
    if(error?.message?.includes("unauthorized")) {
        return response.status(401).json({
            success: false, 
            message: "Unauthorized"
        })
    }
    console.log(error)
    return response.status(500).json({
        success: false,
        message: "Error: Internal server error !"
    }) 
}

module.exports = errorHandler
