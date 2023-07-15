const db = require("../helpers/db.helper")

const table = "reservationTicket"

exports.insert = async function(data){
    const query = `
  INSERT INTO "${table}" ("reservationId", "sectionId", "quantity" ) 
  VALUES ($1, $2, $3) RETURNING *
  `  
    const values = [data.reservationId, data.sectionId, data.quantity]   
    const {rows} = await db.query(query, values)
    return rows[0]
}
exports.findOne = async function(id){
    const query = `
  SELECT * FROM "${table}" WHERE "id"=$1
  `  
    const values = [id]   
    const {rows} = await db.query(query, values)
    return rows[0]
}
exports.findOneByReservationId = async function(id){
    const query = `
  SELECT * FROM "${table}" WHERE "reservationId"=$1
  `  
    const values = [id]   
    const {rows} = await db.query(query, values)
    return rows[0]
}
