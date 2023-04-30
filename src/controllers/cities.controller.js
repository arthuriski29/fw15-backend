const errorHandler = require("../helpers/errorHandler.helper")
// const fileRemover = require("../helpers/fileRemover.helper")
const citiesModel = require("../models/cities.model")

exports.getAllCities = async (req, res) => {
    try {
        // const {id} = req.user
        const cities = await citiesModel.findAll(
            req.query.page, 
            req.query.limit, 
            req.query.search,
            req.query.sort, 
            req.query.sortBy
        )
        if(!cities){
            throw Error("cities_not_found")
        }
        return res.json({
            success: true,
            message: "List of All Cities",
            results: cities
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

exports.getOneCities = async (req, res) => {
    const cities = await citiesModel.findOne(req.params.id)
    if(cities){
        return res.json({
            success: true,
            message: "Detail Selected City",
            results: cities
        })
    }
    errorHandler(res, cities)
}
