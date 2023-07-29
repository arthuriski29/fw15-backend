const db = require("../helpers/db.helper")

const table = "reservations"

// exports.findAll = async function(page, limit, sort, sortBy){
//     page = parseInt(page) || 1
//     limit = parseInt(limit) || 5
//     sort = sort || "id"
//     sortBy = sortBy || "ASC"
//     const offset = (page - 1) * limit

//     const query = `
//     SELECT * FROM "${table}" 
//     WHERE "categoryId"::TEXT LIKE $3
//     ORDER BY "${sort}" ${sortBy} 
//     LIMIT $1 OFFSET $2
//     `
//     const values = [limit, offset]
//     const {rows} = await db.query(query, values)
//     return rows
// }

// exports.findOne = async function(id){
//     const query = `
//     SELECT * FROM "${table}"
//     WHERE id=$1
//     `
//     const values = [id]
//     const {rows} = await db.query(query, values)
//     return rows[0]
// }
// exports.findByUserId = async function(userId){
//     const query = `
//     SELECT * FROM "${table}"
//     WHERE userId=$1
//     `
//     const values = [userId]
//     const {rows} = await db.query(query, values)
//     return rows[0]
// }
// exports.findOneBy = async function(id){
//     const query = `
//     SELECT 
//     "e"."id" as "eventId",
//     "u"."id" as "userId",
//     "resStat"."id" as "reservationStatus",
//     "pay"."id" as "paymentMethodId"

//     FROM "reservations" "res"
//     JOIN "events" "e" ON "e"."id" = "res"."eventId"
//     JOIN "users" "u" ON "u"."id" = "res"."userId"
//     JOIN "reservationStatus" "resStat" ON "resStat"."id" = "res"."status"
//     JOIN "paymentMethod" "pay" ON "pay"."id" = "res"."paymentMethodId"
//     WHERE id=$1
//     `
//     const values = [id]
//     const {rows} = await db.query(query, values)
//     return rows[0]
// }

// exports.findOneByEmail = async function(email){
//     const query = `
//     SELECT * FROM "${table}"
//     WHERE email=$1
//     `
//     const values = [email]
//     const {rows} = await db.query(query, values)
//     return rows[0]
// }

exports.findAllByUserId = async function(id, page, limit, search, sort, sortBy, city){
    page = parseInt(page) || 1
    limit = parseInt(limit) || 8
    search = search || ""
    city = city || ""
    sort = (sort && `"e"."${sort}"`) || "\"r\".\"id\""
    sortBy = sortBy || "DESC"
    const offset = (page - 1) * limit  

    const query = `
    SELECT
    "r"."id", 
    "e"."title", 
    "ci"."name" as "location",
    "e"."date"
    FROM "${table}" "r"
    JOIN "events" "e" ON "e"."id" = "r"."eventId"
    JOIN "cities" "ci" ON "ci"."id" = "e"."cityId"
    WHERE "r"."userId" =$5 
    AND "ci"."name" LIKE $4 
    AND "e"."title" LIKE $3
    ORDER BY ${sort} ${sortBy}  
    LIMIT $1 OFFSET $2
    `

    // const query = `
    // SELECT
    // "e"."id", 
    // "e"."picture", 
    // "e"."title" as "event",
    // "e"."date",
    // "ci"."name" as "city",
    // STRING_AGG("c"."name", ',') as "category",
    // "e"."descriptions",
    // "u"."email" as "createdBy",
    // "e"."createdAt",
    // "e"."updatedAt"
    // FROM "${table}" "e"
    // JOIN "eventCategories" "ec" ON "e"."id" = "ec"."eventId"
    // JOIN "categories" "c" ON "c"."id" = "ec"."categoryId"
    // JOIN "cities" "ci" ON "ci"."id" = "e"."cityId"
    // JOIN "users" "u" ON "u"."id" = "e"."createdBy"
    // WHERE "e"."title" LIKE $3 AND "ci"."name" LIKE $4 AND "c"."name" LIKE $5 
    // GROUP BY "e"."id", "ci"."name", "u"."email"
    // ORDER BY "${sort}" ${sortBy} 
    // LIMIT $1 OFFSET $2
    // `
    const values = [limit, offset, `%${search}%`, `%${city}%`, id ]
    const {rows} = await db.query(query, values)
    return rows
}
 

exports.insert = async function(data){
    const query = `
    INSERT INTO "${table}" ("eventId", "userId", "status" ) 
    VALUES ($1, $2, $3) RETURNING *
    `  
    const values = [data.eventId, data.userId, data.status]   
    const {rows} = await db.query(query, values)
    return rows[0]
}
exports.findOne = async function(id){
    const query = `
    SELECT * FROM "reservations" WHERE "id"=$1
    `  
    const values = [id]   
    const {rows} = await db.query(query, values)
    return rows[0]
}
exports.findByUserId = async function(userId){
    const query = `
    SELECT * FROM "reservations" WHERE "userId"=$1
    `  
    const values = [userId]   
    const {rows} = await db.query(query, values)
    return rows[0]
}
exports.findAllById = async function(userId){
    const query = `
    SELECT
    "r"."id" as "reservationId" ,
    "e"."title", 
    "e"."cityId" as "cityId",
    "e"."date"  
    FROM "${table}" "r"
    JOIN "events" "e" ON "e"."id" = "r"."eventId"
    WHERE "userId"=$1
    `  
    const values = [userId]   
    const {rows} = await db.query(query, values)
    return rows
}
exports.insertReservation = async function(data, userId){
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
    "eventId"=COALESCE(NULLIF($2::INTEGER, NULL), "eventId"),
    "userId"=COALESCE(NULLIF($3::INTEGER, NULL), "userId"),
    "status"=COALESCE(NULLIF($4::INTEGER, NULL), "status"),
    "paymentMethodId"=COALESCE(NULLIF($5::INTEGER, NULL), "paymentMethodId")
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

