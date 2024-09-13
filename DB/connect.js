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

// Get all cakes
async function get_all_cakes(pool) {
	const qr = `
	SELECT IDFood,Food,Price,TypeID,Amount,img_src,info_Detail,Type 
	FROM food JOIN type_of_food 
	ON TypeID = type_of_food.IDType;`
	const [rs] = await pool.query(qr);
	return rs;
}

// Get cake by id 
async function get_cake ( pool , id ){
	const qr = `
	SELECT IDFood,Food,Price,TypeID,Amount,img_src,info_Detail,Type 
	FROM food JOIN type_of_food 
	ON TypeID = type_of_food.IDType
	WHERE IDFood = ${id};`
	const [rs] = await pool.query(qr);
	return rs;
}
///////////////////////////////////////////////////////////////////////////////////////////////

//Sign up
async function signUp(pool, name, pass, mail, tel) {
    const sql = "INSERT INTO user_table(User_name,Mail,Phone,Pass) VALUES (?,?,?,?)";
    const rs = await pool.query(sql, [name, mail, tel, pass]);
	return rs 
    // console.log("inserted")
}

//Login 
async function Login(pool, name, pass) {
    const [rs] = await pool.query("SELECT * FROM user_table WHERE User_name = ? AND Pass = ?", [name, pass]);
    return rs[0];
}

module.exports = {
	makePool,
	get_all_cakes,
	get_cake,
	//login and signup
	Login,
	signUp
};
