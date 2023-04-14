const admin = require("express").Router()

admin.use("/users", require("./users.router"))
//untuk tugas


module.exports = admin
