const errorHandler = (response, error) => {
    // if (error?.message?.includes("invalid input")) {
    //     return response.status(409).json({
    //         success: false,
    //         message: "Error: Invalid input, please select an id !"
    //     })
    // }
    if (error?.message?.includes("duplicate key")) {
        return response.status(409).json({
            success: false,
            message: "Error: Email already exist !"
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
    return response.status(500).json({
        success: false,
        message: "Error: Internal server error !"
    }) 
}

module.exports = errorHandler
