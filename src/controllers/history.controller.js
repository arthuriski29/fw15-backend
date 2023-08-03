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
exports.getOneHistory = async (req, res) => {
    try {
        const {id} = req.params
        const userId = req.user.id
        const history = await rsvModel.findOneByUserBooked(id, userId)
        console.log(history)
        return res.json({
            success: true,
            message: `History with id ${id} displayed`,
            results: history

        })
    } catch (err) {
        throw Error(err.message) 
    }
}
