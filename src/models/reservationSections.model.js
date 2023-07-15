const db = require("../helpers/db.helper")

const table = "reservationSections"

exports.findAll = async function(){
    const query = `
    SELECT * 
    FROM "${table}"
    `
    const {rows} = await db.query(query)
    return rows
}
exports.findOne = async function(id){
    const query = `
    SELECT * 
    FROM "${table}"
    WHERE "id"=$1
    `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.findOneByEmail = async function(email){
    const query = `
    SELECT * FROM "${table}"
    WHERE email=$1
    `
    const values = [email]
    const {rows} = await db.query(query, values)
    return rows[0]
}
 

