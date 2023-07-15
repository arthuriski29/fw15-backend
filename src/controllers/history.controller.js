const rsvModel = require("../models/reservations.model")

exports.getAllHistory = async (req, res)=> {
    const {id: userId} = req.user
    const histories = await rsvModel.findAllByUserId(userId, req.query)
    return res.json({
        success: true,
        message: "History Collected",
        results: histories
    })
}
