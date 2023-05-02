const errorHandler = require("../helpers/errorHandler.helper")
const reservationsModel = require("../models/reservations.model")
const paymentMethodModel = require("../models/paymentMethod.model")

exports.createReservation = async (req, res) => {
    try {
        const {id} = req.user
        const {reservationId, paymentMethodId} = req.body
        const reservation = await reservationsModel.findOne(reservationId)
        const paymentMethod = await paymentMethodModel.findOne(paymentMethodId)

        if(!reservation){
            throw Error("reservationId_not_found")
        }
        if(!paymentMethod){
            throw Error("paymentMethodId_not_found")
        }
        const data ={
            ...req.body
        }
        const payment = await paymentMethod.insertRes(id, data)
        if(!payment) {
            throw Error("no_event_created")
        }
        return res.json({
            success: true,
            message: "Create Events successfully",
            results: payment
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}
