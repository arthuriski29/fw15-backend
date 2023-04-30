const errorHandler = require("../helpers/errorHandler.helper")
// const fileRemover = require("../helpers/fileRemover.helper")
const categoriesModel = require("../models/categories.model")

exports.getAllCategories = async (req, res) => {
    try {
        // const {id} = req.user
        const categories = await categoriesModel.findAll(
            req.query.page, 
            req.query.limit, 
            req.query.search,
            req.query.sort, 
            req.query.sortBy
        )
        if(!categories){
            throw Error("categories_not_found")
        }
        return res.json({
            success: true,
            message: "List of All Categories",
            results: categories
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

exports.getOneCategories = async (req, res) => {
    const categories = await categoriesModel.findOne(req.params.id)
    if(categories){
        return res.json({
            success: true,
            message: "Detail Selected Category",
            results: categories
        })
    }
    errorHandler(res, categories)
}
