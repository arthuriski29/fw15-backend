const errorHandler = (response, error) => {
    if (error?.message?.includes("duplicate key")) {
        return response.status(409).json({
            success: false,
            message: "Error: Email already exist !"
        })
    }
    if(error === undefined){
        return response.status(404).json({
            success: false,
            message: "Error: user not found"
        })
    } 
    return response.status(500).json({
        success: false,
        message: "Error: Internal server error !"
    }) 
}

module.exports = errorHandler
