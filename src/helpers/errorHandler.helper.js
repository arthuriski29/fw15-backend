const errorHandler = (response, error) => {
    
    if (error?.message?.includes("duplicate key")) {
        return response.status(409).json({
            success: false,
            message: "Error: Email already exist !"
        })
    }
    if(error?.message?.includes("name_empty_field")) {
      
        return response.status(400).json({
            success: false, 
            message: "Name cannot be empty"
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
