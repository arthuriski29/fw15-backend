const db = require("../helpers/db.helper")

const table = "wishlist"

exports.findAll = async function(page, limit, sort, sortBy){
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page - 1) * limit

    const query = `
    SELECT * FROM "${table}" 
    WHERE "Id"::TEXT LIKE $3
    ORDER BY "${sort}" ${sortBy} 
    LIMIT $1 OFFSET $2
    `
    const values = [limit, offset]
    const {rows} = await db.query(query, values)
    return rows
}
exports.findAllByUser = async function(userId){
    const query = `
    SELECT 
    "e"."id", 
    "e"."title" as "event", 
    "ci"."name" as "location", 
    "u"."email" as "addedBy",
    "w"."userId"
    
    FROM "${table}" "w"
    JOIN "events" "e" ON "e"."id" = "w"."eventId"
    JOIN "cities" "ci" ON "ci"."id" = "e"."cityId"
    JOIN "users" "u" ON "u"."id" = "w"."userId"
    WHERE "w"."userId"=$1
    `
    const values = [userId]
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
exports.findOneByUserId = async function(userId){
    const query = `
    SELECT
    "w"."eventId",
    "w"."userId"

    
    FROM "${table}" "w"
    JOIN "events" "e" ON "e"."id" = "w"."eventId"
    WHERE "w"."userId"=$1
    `
    const values = [userId]
    const {rows} = await db.query(query, values)
    return rows[0]
}
exports.findByUserandEvent = async function(userId, eventId){
    const query = `
    SELECT
    "w"."userId",
    "w"."eventId"

    
    FROM "${table}" "w"
    JOIN "events" "e" ON "e"."id" = "w"."eventId"
    WHERE "w"."userId"=$1 AND "w"."eventId"=$2
    `
    const values = [userId, eventId]
    const {rows} = await db.query(query, values)
    return rows[0]
}
 

exports.insert = async function(data){
    const query = `
    INSERT INTO "${table}" ("eventId", "userId") 
    VALUES ($1, $2) RETURNING *
    `  
    const values = [data.eventId, data.userId]   
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.insertWish = async function(userId, eventId){
    const query = `
    INSERT INTO "${table}" ("userId", "eventId") 
    VALUES ($1, $2) RETURNING *
    `  
    const values = [userId, eventId]   
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.update = async function(id, data){
    const query = `
    UPDATE "${table}" 
    SET 
    "eventId"=$2,
    "userId"=$3,
    
    WHERE "id"=$1
    RETURNING *
    `  
    const values = [id, data.eventId, data.userId]   
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
exports.destroyUser = async function(userId, eventId){
    const query = `
    DELETE FROM "${table}" 
    WHERE "userId"=$1 AND "eventId"=$2
    RETURNING *
    `  
    const values = [userId, eventId]   
    const {rows} = await db.query(query, values)
    return rows[0]
}

