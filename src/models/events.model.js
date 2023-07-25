const db = require("../helpers/db.helper")

const table = "events"

exports.findAll = async function(page, limit, search, sort, sortBy){
    page = parseInt(page) || 1
    limit = parseInt(limit) || 8
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page - 1) * limit

    const query = `
    SELECT * FROM "${table}" 
    WHERE "title" LIKE $3 
    ORDER BY "${sort}" ${sortBy} 
    LIMIT $1 OFFSET $2
    `
    const values = [limit, offset, `%${search}%`]
    const {rows} = await db.query(query, values)
    return rows
}
exports.findAllManage = async function(page, limit, search, sort, sortBy, city, category){
    page = parseInt(page) || 1
    limit = parseInt(limit) || 8
    search = search ? search.toLowerCase() : ""
    city = city || ""
    category = category || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page - 1) * limit  
    const query = `
    SELECT
    "e"."id", 
    "e"."picture", 
    "e"."title" as "event",
    "e"."date",
    "ci"."name" as "city",
    STRING_AGG("c"."name", ',') as "category",
    "e"."descriptions",
    "u"."email" as "createdBy",
    "e"."createdAt",
    "e"."updatedAt"
    FROM "${table}" "e"
    JOIN "eventCategories" "ec" ON "e"."id" = "ec"."eventId"
    JOIN "categories" "c" ON "c"."id" = "ec"."categoryId"
    JOIN "cities" "ci" ON "ci"."id" = "e"."cityId"
    JOIN "users" "u" ON "u"."id" = "e"."createdBy"
    WHERE LOWER("e"."title") LIKE $3 AND "ci"."name" LIKE $4 AND "c"."name" LIKE $5 
    GROUP BY "e"."id", "ci"."name", "u"."email"
    ORDER BY "${sort}" ${sortBy} 
    LIMIT $1 OFFSET $2
    `
    const values = [limit, offset, `%${search}%`, `%${city}%`, `%${category}%` ]
    console.log(values)
    const {rows} = await db.query(query, values)
    return rows
}
exports.findAllUserMade = async function(id, page, limit, search, sort, sortBy, location, category){
    page = parseInt(page) || 1
    limit = parseInt(limit) || 8
    search = search || ""
    location = location || ""
    category = category || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page - 1) * limit  
    const query = `
    SELECT
    "e"."id", 
    "e"."picture", 
    "e"."title" as "event",
    "e"."date",
    "ci"."name" as "location",
    STRING_AGG("c"."name", ',') as "category",
    "e"."descriptions",
    "e"."createdBy",
    "e"."createdAt",
    "e"."updatedAt"
    FROM "${table}" "e"
    JOIN "eventCategories" "ec" ON "e"."id" = "ec"."eventId"
    JOIN "categories" "c" ON "c"."id" = "ec"."categoryId"
    JOIN "cities" "ci" ON "ci"."id" = "e"."cityId"
    WHERE "e"."createdBy"=$1 AND "e"."title" LIKE $4 AND "ci"."name" LIKE $5 AND "c"."name" LIKE $6 
    GROUP BY "e"."id", "ci"."name"
    ORDER BY "${sort}" ${sortBy} 
    LIMIT $2 OFFSET $3
    `
    const values = [id, limit, offset, `%${search}%`, `%${location}%`, `%${category}%` ]
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

exports.findOneEvents = async function(id){
    const query = `
  SELECT
  "e"."id" as "eventId",
  "e"."picture",
  "e"."title" as "event",
  "ci"."name" as "location",
  "e"."date",
  "ci"."id" as "cityId",
  "e"."descriptions" as "descriptions",
  "ci"."mapLocation",
  "e"."createdBy"

  FROM "${table}" "e"
  JOIN "cities" "ci" ON "ci"."id" = "e"."cityId"
  JOIN "users" "u" ON "u"."id" = "e"."createdBy"
  WHERE "e"."id"=$1
  `
    //Join dari tabel Users , dimana users.id nya = table profile.id
    //tidak perlu * , ,karena ingin mengambil kolom tertentu saja (bukan semua kolom)

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
exports.findOneByUserId = async function(createdBy){
    const query = `
    SELECT
    "e"."id" as "eventId",
    "e"."title" as "event",
    "ci"."name" as "location",
    "cat"."name" as "category",
    "e"."date",
    "ci"."id" as "cityId",
    "ci"."mapLocation",
    "e"."createdBy"
    FROM "${table}" "e"
    JOIN "eventCategories" "ec" ON "e"."id" = "ec"."eventId"
    JOIN "categories" "cat" ON "cat"."id" = "ec"."categoryId"
    JOIN "cities" "ci" ON "ci"."id" = "e"."cityId"
    JOIN "users" "u" ON "u"."id" = "e"."createdBy"
    WHERE createdBy=$1
    `
    const values = [createdBy]
    const {rows} = await db.query(query, values)
    return rows[0]
}
 

exports.insert = async function(data){
    const query = `
    INSERT INTO "${table}" 
    ("picture", "title", "date", "cityId", "descriptions") 
    VALUES ($1, $2, $3, $4, $5) RETURNING *
    `  
    const values = [data.picture, data.title, data.date, data.cityId, data.descriptions]   
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.insertMyEvents = async function(createdBy, data){
    const query = `
    INSERT INTO "${table}" 
    ("picture", "title", "date", "cityId", "descriptions", "createdBy") 
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `  
    const values = [data.picture, data.title, data.date, data.cityId, data.descriptions, createdBy]   
    const {rows} = await db.query(query, values)
    return rows[0]
}
  
exports.update = async function(id, data){
    const query = `
    UPDATE "${table}" 
    SET 
    "picture"=COALESCE(NULLIF($2, ''), "picture"), 
    "title"=COALESCE(NULLIF($3, ''), "title"), 
    "date"=COALESCE(NULLIF($4::DATE, NULL), "date"), 
    "cityId"=COALESCE(NULLIF($5::INTEGER, NULL), "cityId"), 
    "descriptions"=COALESCE(NULLIF($6, ''), "descriptions")
    
    WHERE "id"=$1
    RETURNING *
    `  
    const values = [id, data.picture, data.title, data.date, data.cityId, data.descriptions]   
    const {rows} = await db.query(query, values)
    return rows[0]
}
exports.updateByUser = async function(userId, data){
    const query = `
    UPDATE "${table}" 
    SET 
    "picture"=COALESCE(NULLIF($2, ''), "picture"), 
    "title"=COALESCE(NULLIF($3, ''), "title"), 
    "date"=COALESCE(NULLIF($4::DATE, NULL), "date"), 
    "cityId"=COALESCE(NULLIF($5::INTEGER, NULL), "cityId"), 
    "descriptions"=COALESCE(NULLIF($6, ''), "descriptions")
    
    WHERE "createdBy"=$1
    RETURNING *
    `  
    const values = [userId, data.picture, data.title, data.date, data.cityId, data.descriptions]   
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
exports.destroyByUser = async function(createdBy, id){
    const query = `
    DELETE FROM "${table}" 
    WHERE "createdBy"=$1 AND "id"=$2
    RETURNING *
    `  
    const values = [createdBy, id]   
    const {rows} = await db.query(query, values)
    return rows[0]
}

