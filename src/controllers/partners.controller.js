const errorHandler = require("../helpers/errorHandler.helper")
// const fileRemover = require("../helpers/fileRemover.helper")
const partnersModel = require("../models/partners.model")

exports.getAllPartners = async (req, res) => {
    try {
        // const {id} = req.user
        const partners = await partnersModel.findAll(
            req.query.page, 
            req.query.limit, 
            req.query.search,
            req.query.sort, 
            req.query.sortBy
        )
        if(!partners){
            throw Error("partners_not_found")
        }
        return res.json({
            success: true,
            message: "List of All Partners",
            results: partners
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

exports.getOnePartners = async (req, res) => {
    const partners = await partnersModel.findOne(req.params.id)
    if(partners){
        return res.json({
            success: true,
            message: "Detail Selected Partner",
            results: partners
        })
    }
    errorHandler(res, partners)
}
