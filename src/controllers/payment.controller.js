const errorHandler = require("../helpers/errorHandler.helper")
const rsvModel = require("../models/reservations.model") 
const sectionModel = require("../models/reservationSections.model") 
const eventModel = require("../models/events.model") 
const ticketModel = require("../models/reservationTickets.model") 
const methodModel = require("../models/paymentMethod.model") 

exports.getAllPayment = async (req,res) => {
    const methodData = await methodModel.findAll()
    return res.json({
        success: true,
        message: "Payment List",
        results: methodData
    })
}

exports.createPayment = async (req, res) => {
    try {
        const {id: userId} = req.user
        const rsv = await rsvModel.findOne(req.body.reservationId)
        if(rsv.userId !== userId){
            throw (Error("data_mismatch"))
        }
        const update = await rsvModel.update(req.body.reservationId,{
            paymentMethodId: req.body.paymentMethodId,
            status: 2
        })
        const ticket = await ticketModel.findOneByReservationId(update.id)

        const section = await sectionModel.findOne(ticket.sectionId)
        return res.json({
            success: true,
            message: "Payment Invoice Created",
            results:{
                id: rsv.id,
                events: await eventModel.findOne(update.eventId),
                sectionName: section.name,
                quantity: ticket.quantity,
                pricePerTicket: `Rp ${section.price},-`,
                totalPrice: `Rp ${((ticket.quantity) * section.price)},-`
            }
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}
