const admin = require("express").Router()

admin.use("/users", require("./users.router"))

admin.use("/profile", require("./profile.router"))

admin.use("/city", require("./cities.router"))
admin.use("/events", require("./events.router"))
admin.use("/partners", require("./partners.router"))


admin.use("/eventCategories", require("./eventCategories.router")) //ini harusnya dalam endpoint event
admin.use("/categories", require("./categories.router"))
admin.use("/reservations", require("./reservations.router"))
admin.use("/reservationSections", require("./reservationSections.router"))
admin.use("/reservationStatus", require("./reservationStatus.router"))
admin.use("/reservationTickets", require("./reservationTickets.router"))
admin.use("/payment", require("./paymentMethod.router"))
admin.use("/wishlist", require("./wishlist.router"))

// admin.use("/city", require("./cities.router"))
// admin.use("/payment", require("./paymentMethod.router"))
// admin.use("/changePassword", require("./changePassword.router"))
// admin.use("/history", require("./history.router"))
// admin.use("/wishlist", require("./wishlist.router"))
//untuk tugas


module.exports = admin
