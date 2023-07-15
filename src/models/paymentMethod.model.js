const db = require("../helpers/db.helper")

const table = "paymentMethod"

exports.findAll = async function(){
    const query = `
  SELECT * 
  FROM "${table}"
  `
    const {rows} = await db.query(query)
    return rows
}
