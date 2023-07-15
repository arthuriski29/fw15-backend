const errorHandler = require("../helpers/errorHandler.helper")
const rsvModel = require("../models/reservations.model")
const ticketModel = require("../models/reservationTickets.model")
const eventModel = require("../models/events.model")
const sectionModel = require("../models/reservationSections.model")

exports.createReservation = async (req, res) => {
    const {id: userId} = req.user
    const rsvData = {
        ...req.body,
        userId,
        status: 1
    }
    const rsv = await rsvModel.insert(rsvData)
    const ticketRsv = {
        ...req.body,
        reservationId: rsv.id
    }
    const section = await sectionModel.findOne(req.body.sectionId)

    await ticketModel.insert(ticketRsv)
    return res.json({
        success: true,
        message: "Create Reservation Success",
        results:{
            id: rsv.id,
            events: await eventModel.findOne(req.body.eventId),
            sectionName: section.name,
            quantity: req.body.quantity,
            pricePerTicket: `Rp ${section.price},-`,
            totalPrice: `Rp ${((req.body.quantity) * section.price)},-`
        }
    })
}
exports.makeTicket = async (req, res) => {
    try {
        const { id } = req.user

        if (!id) {
            throw Error("Unauthorized")
        }

        const data = { ...req.body }

        const reservation = await rsvModel.findByUserId(id)

        if (!reservation) {
            throw Error("Reservation is not found")
        }

        const ticket = await ticketModel.insert(data)

        return res.json({
            success: true,
            message: "Add ticket successfully",
            results: ticket,
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}
