const admin = require("express").Router()

admin.use("/users", require("./users.router"))
admin.use("/profile", require("./profile.router"))

// admin.use("/events", require("./events.router"))
// admin.use("/city", require("./cities.router"))
// admin.use("/categories", require("./eventCategories.router"))
// admin.use("/partners", require("./partners.router"))
// admin.use("/reservation", require("./reservation.router"))
// admin.use("/payment", require("./paymentMethod.router"))
// admin.use("/changePassword", require("./changePassword.router"))
// admin.use("/history", require("./history.router"))
// admin.use("/wishlist", require("./wishlist.router"))
//untuk tugas


module.exports = admin
