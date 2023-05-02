const db = require("../helpers/db.helper")

const table = "eventCategories"

exports.findAll = async function(page, limit, search, sort, sortBy){
    page = parseInt(page) || 1
    limit = parseInt(limit) || 7
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page - 1) * limit

    const query = `
    SELECT * FROM "${table}" 
    WHERE "categoryId"::TEXT LIKE $3
    ORDER BY "${sort}" ${sortBy} 
    LIMIT $1 OFFSET $2
    `
    const values = [limit, offset, `%${search}%`]
    const {rows} = await db.query(query, values)
    return rows
}
exports.findAllManage = async function(page, limit, search, sort, sortBy, location, category){
    page = parseInt(page) || 1
    limit = parseInt(limit) || 7
    search = search || ""
    location = location || ""
    category = category || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page - 1) * limit  
    const query = `
    SELECT 
    "e"."id", 
    "e"."title" as "event",
    "ci"."name" as "location",
    STRING_AGG("c"."name", ',') as "category",
    "e"."descriptions",
    "e"."date",
    "e"."createdAt",
    "e"."updatedAt"
    FROM "eventCategories" "ec"
    JOIN "events" "e" ON "e"."id" = "ec"."eventId"
    JOIN "categories" "c" ON "c"."id" = "ec"."categoryId"
    JOIN "cities" "ci" ON "ci"."id" = "e"."cityId"
    WHERE "e"."title" LIKE $3 AND "ci"."name" LIKE $4 AND "c"."name" LIKE $5 
    GROUP BY "e"."id", "ci"."name"
    ORDER BY "${sort}" ${sortBy} 
    LIMIT $1 OFFSET $2
    `
    const values = [limit, offset, `%${search}%`, `%${location}%`, `%${category}%` ]
    const {rows} = await db.query(query, values)
    return rows
}

exports.findOneByUserId = async function(userId){
    const query = `
    SELECT 
    "e"."id" as "eventId", 
    "e"."title",
    "ci"."name" as "location",
    STRING_AGG("c"."name", ',') as "category",
    "e"."descriptions",
    "e"."date",
    "e"."createdAt",
    "e"."updatedAt",
    "e"."createdBy"
    FROM "eventCategories" "ec"
    JOIN "events" "e" ON "e"."id" = "ec"."eventId"
    JOIN "categories" "c" ON "c"."id" = "ec"."categoryId"
    JOIN "cities" "ci" ON "ci"."id" = "e"."cityId"
    JOIN "users" "u" ON "u"."id" = "e"."createdBy"
    WHERE "e"."createdBy"=$1
    GROUP BY "e"."id", "ci"."name";
    `
    const values = [userId]
    const {rows} = await db.query(query, values)
    return rows[0]
}
// exports.findOneByuserId = async function(userId){
//     const query = `
//     SELECT 
//     "e"."id", 
//     "e"."title",
//     "ci"."name" as "location",
//     STRING_AGG("c"."name", ',') as "category",
//     "e"."descriptions",
//     "e"."date",
//     "e"."createdAt",
//     "e"."updatedAt"
//     FROM "eventCategories" "ec"
//     JOIN "events" "e" ON "e"."id" = "ec"."eventId"
//     JOIN "categories" "c" ON "c"."id" = "ec"."categoryId"
//     JOIN "cities" "ci" ON "ci"."id" = "e"."cityId"
//     WHERE "userId"=$1
//     GROUP BY "e"."id", "ci"."name";
//     `
//     const values = [userId]
//     const {rows} = await db.query(query, values)
//     return rows[0]
// }

