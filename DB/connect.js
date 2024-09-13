require('dotenv').config();
const mysql = require('mysql2');

// Variables for pool
const host = process.env.DB_HOST || "localhost";
const user = process.env.DB_USER || "root";
const db = process.env.DB_NAME || "LINUS_OSS";
const pass = process.env.DB_PASS || "linh";

// Create the pool for connection to database
function makePool() {
	const pool = mysql.createPool({
		host: host,
		user: user,
		password: pass,
		database: db
	}).promise();
	return pool;
}

// Main functions for api
async function get_all_cakes(pool) {
	const qr = `
	SELECT IDFood,Food,Price,TypeID,Amount,img_src,info_Detail,Type 
	FROM food JOIN type_of_food 
	ON TypeID = type_of_food.IDType;`
	const [rs] = await pool.query(qr);
	return rs;
}

module.exports = {
	makePool,
	get_all_cakes
};
