const db = require("../helpers/db.helper")

const table = "reservations"

exports.findAll = async function(page, limit, sort, sortBy){
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page - 1) * limit

    const query = `
    SELECT * FROM "${table}" 
    WHERE "categoryId"::TEXT LIKE $3
    ORDER BY "${sort}" ${sortBy} 
    LIMIT $1 OFFSET $2
    `
    const values = [limit, offset]
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
exports.findOneBy = async function(id){
    const query = `
    SELECT 
    "e"."id" as "eventId",
    "u"."id" as "userId",
    "resStat"."id" as "reservationStatus",
    "pay"."id" as "paymentMethodId"

    FROM "reservations" "res"
    JOIN "events" "e" ON "e"."id" = "res"."eventId"
    JOIN "users" "u" ON "u"."id" = "res"."userId"
    JOIN "reservationStatus" "resStat" ON "resStat"."id" = "res"."status"
    JOIN "paymentMethod" "pay" ON "pay"."id" = "res"."paymentMethodId"
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
    INSERT INTO "${table}" ("eventId", "userId", "status", "paymentMethodId" ) 
    VALUES ($1, $2, $3, $4) RETURNING *
    `  
    const values = [data.eventId, data.userId, data.status, data.paymentMethodId]   
    const {rows} = await db.query(query, values)
    return rows[0]
}
exports.insertRes = async function(data, userId){
    const query = `
    INSERT INTO "${table}" ("eventId", "userId", "status", "paymentMethodId" ) 
    VALUES ($1, $2, $3, $4) RETURNING *
    `  
    const values = [data.eventId, userId, data.status, data.paymentMethodId]   
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.update = async function(id, data){
    const query = `
    UPDATE "${table}" 
    SET 
    "eventId"=$2,
    "userId"=$3,
    "status"=$4,
    "paymentMethodId"=$5


    WHERE "id"=$1
    RETURNING *
    `  
    const values = [id, data.eventId, data.userId, data.status, data.paymentMethodId]   
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

