const db = require("../helpers/db.helper")

exports.findAll = async function(){
    const {rows} = await db.query(`
    SELECT * FROM "users"
    `)
    return rows
}

exports.insert = async function(){
    const {rows} = await db.query(`
    INSERT INTO "users" ("email", "password") VALUES ('admin@mail.com', '1234');
    `)
    return rows
}
