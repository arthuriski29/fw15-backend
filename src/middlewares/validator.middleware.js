const {body, validationResult} = require("express-validator")
// const errorHandler = require("../helpers/errorHandler.helper")

 
const emailFormat = body("email").isEmail().withMessage("Email is invalid")
const strongPassword = body("password").isStrongPassword().withMessage("Password must be strong")
const fullNameFormat = body("fullName").isLength({min: 3, max: 80}).withMessage("Name length si invalid")

const rules = {
    authLogin: [
        emailFormat,
        body("password").isLength({min:1}).withMessage("Password is invalid")
    ],
    createUser: [
        fullNameFormat,
        emailFormat, 
        strongPassword
    ]
}

const validator = (request, response, next) => {
    const errors = validationResult(request)
    try{
        if(!errors.isEmpty()) {
            
            throw Error("validation")
        }
        return next()
    }catch(error){
        return response.status(400).json({
            success: false,
            message: "Validation error",
            results: errors.array()
        })
        // return errorHandler(response, error)
    }
}

const validate = (selectedRules) => [rules[selectedRules], validator]

module.exports = validate
