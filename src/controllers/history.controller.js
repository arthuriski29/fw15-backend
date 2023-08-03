const rsvModel = require("../models/reservations.model")

exports.getAllHistory = async (req, res)=> {
    const {id: userId} = req.user
    const histories = await rsvModel.findAllByUserId(userId, req.query)
    if(!histories){
        return res.json({
            success: false,
            message: "This user have not book any transaction yet"
        })
    }
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

        if(!history){
            return res.json({
                success: false,
                message: `No history with id ${id} found`
            })
        }

        return res.json({
            success: true,
            message: `History with id ${id} displayed`,
            results: history

        })
    } catch (err) {
        throw Error(err.message) 
    }
}
