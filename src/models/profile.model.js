const db = require("../helpers/db.helper")

const table = "profile"

exports.findAll = async function(page, limit, search, sort, sortBy){
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page - 1) * limit

    const query = `
    SELECT * FROM "${table}" 
    WHERE "fullName" LIKE $3 
    ORDER BY "${sort}" ${sortBy} 
    LIMIT $1 OFFSET $2
    `
    const values = [limit, offset, `%${search}%`]
    const {rows} = await db.query(query, values)
    return rows
}

exports.findOne = async function(id){
    const query = `
    SELECT * FROM "${table}"
    WHERE id=$1
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
 

exports.insert = async function(data){
    const query = `
    INSERT INTO "${table}" 
    ("picture", "fullName", "phoneNumber", "gender", "profession", "nationality", "birthDate", "userId") 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
    `  
    const values = [data.picture, data.fullName, data.phoneNumber, data.gender, data.profession, data.nationality, data.birthDate, data.userId]   
    const {rows} = await db.query(query, values)
    return rows[0]
}
  
exports.update = async function(id, data){
    const query = `
    UPDATE "${table}" 
    SET 
    "picture"=COALESCE(NULLIF($2, ''), "picture"), 
    "fullName"=COALESCE(NULLIF($3, ''), "fullName"), 
    "phoneNumber"=$4,
    "gender"=$5,
    "profession"=COALESCE(NULLIF($6, ''), "profession"), 
    "nationality"=COALESCE(NULLIF($7, ''), "nationality"), 
    "birthDate"=$8,
    "userId"=$9
    
    WHERE "id"=$1
    RETURNING *,
      CASE
        WHEN "gender" THEN 'Male'
        ElSE 'Female'
      END "gender"
    `
    const values = [id, data.picture, data.fullName, data.phoneNumber, data.gender, data.profession, data.nationality, data.birthDate, data.userId]   
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.destroy = async function(id){
    const query = `
    DELETE FROM "${table}" 
    WHERE "id"=$1
    RETURNING *
    `  
    const values = [id]   
    const {rows} = await db.query(query, values)
    return rows[0]
}

