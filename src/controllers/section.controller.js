const sectionModel = require("../models/reservationSections.model")

exports.getAllSections = async(req, res)=>{
    const sections = await sectionModel.findAll()
    return res.json({
        success: true,
        message:"Ticket Sections Selected",
        results: sections
    })
}
