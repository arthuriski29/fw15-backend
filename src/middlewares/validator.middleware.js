const {body, query, param, validationResult} = require("express-validator")
// const errorHandler = require("../helpers/errorHandler.helper")

const fileRemover = require("../helpers/fileRemover.helper")
 
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
    ],
    getAllUsers: [ //agar pada GET ALL USERS, input Sort nya hanya bisa diinputkan ASC atau DESC, lainnya error
        // query("page").isIn(["ASC", "DESC"]).withMessage("Sort type is invalid"),
        // query("limit").isIn(["ASC", "DESC"]).withMessage("Sort type is invalid"),
        // query("search").isIn(["ASC", "DESC"]).withMessage("Sort type is invalid"),
        query("sort").isIn(["id", "fullName"]).withMessage("Sort by fullName or ID"),
        query("sortBy").isIn(["ASC", "DESC"]).withMessage("Sort type is invalid").optional({nullable: true})

    ],
    idParams: [ //bentuk rules bisa dichain secara terus menerus
        param("id").toInt().isDecimal().withMessage("Id is invalid").isInt({min: 1}).withMessage("Id have to be more than 0")
    ]
}

const validator = (request, response, next) => {
    const errors = validationResult(request)
    try{
        
        if(!errors.isEmpty()) {
            fileRemover(request.file)
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
