const db = require("../helpers/db.helper")

const table = "events"

exports.findAll = async function(page, limit, search, sort, sortBy){
    page = parseInt(page) || 1
    limit = parseInt(limit) || 7
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
  "ci"."id",
  "e"."title",
  "ci"."name",
  "e"."date",
  "ci"."mapLocation"

  FROM "${table}" "e"
  JOIN "cities" "ci" ON "ci"."id" = "e"."cityId"
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

