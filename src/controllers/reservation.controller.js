const errorHandler = require("../helpers/errorHandler.helper")
const reservationsModel = require("../models/reservations.model")
const eventModel = require("../models/events.model")
const userModel = require("../models/users.model")
const reservationStatusModel = require("../models/reservationStatus.model")
const paymentMethodModel = require("../models/paymentMethod.model")
const reservationSectionsModel = require("../models/reservationSections.model")
const reservationTicketsModel = require("../models/reservationTickets.model")

exports.createReservation = async (req, res) => {
    try {
        const {id} = req.user
        const {eventId, userId, status, paymentMethodId} = req.body
        const event = await eventModel.findOne(eventId)
        const user = await userModel.findOne(userId)
        const stat = await reservationStatusModel.findOne(status)
        const paymentMethod = await paymentMethodModel.findOne(paymentMethodId)

        if(!event){
            throw Error("eventId_not_found")
        }
        if(!user){
            throw Error("userId_not_found")
        }
        if(!stat){
            throw Error("status_not_found")
        }
        if(!paymentMethod){
            throw Error("paymentMethodId_not_found")
        }
        const data ={
            ...req.body
        }
        const reservations = await reservationsModel.insertRes(id, data)
        if(!reservations) {
            throw Error("no_event_created")
        }
        return res.json({
            success: true,
            message: "Create Events successfully",
            results: reservations
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

exports.createReservationTicket = async (req, res) => {
    try {
        // const {id} = req.user
        const {reservationId, sectionId} = req.body
        const reservation = await reservationsModel.findOne(reservationId)
        const section = await reservationSectionsModel.findOne(sectionId)
      

        if(!reservation){
            throw Error("reservationId_not_found")
        }
        if(!section){
            throw Error("sectionId_not_found")
        }
        const data ={
            ...req.body
        }
        const resTicket = await reservationTicketsModel.insertRes(reservationId, data)
        if(!resTicket) {
            throw Error("no_resTicket_created")
        }
        return res.json({
            success: true,
            message: "Create Reservation Ticket successfully",
            results: resTicket
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}
