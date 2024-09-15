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
////////////////////////////////////////////////////////////////////////////////////////
//Cart functions 

//Check if item in cart
async function checkItemInCart(pool, userID, foodID) {
    const query = `
        SELECT * FROM cart
        WHERE UserID = ? AND IDFood = ?;
    `;
    const [rows] = await pool.query(query, [userID, foodID]);
    return rows.length > 0 ? rows[0] : null; // Return the item if found, otherwise null
}

//Add to card
async function addCart(pool,userID, foodID) {
    try {
        // Use the helper function to check if the item is already in the cart
        const existingItem = await checkItemInCart(pool,userID, foodID);
        let quantity = 1; // Default quantity when adding a new item
        let arr_Food = await get_all_cakes(pool); // Get all cakes
        let foodItem = arr_Food.find(item => item.IDFood === foodID); // Get food item by ID

        if (!foodItem) {
            throw new Error(`Food with ID ${foodID} not found`);
        }

        let price = foodItem.Price; // Get price from the selected food item
        let total = price * quantity; // Calculate total

        if (!existingItem) {
            // Item not in cart, insert new item
            const insertCartQuery = `
                INSERT INTO cart (UserID, IDFood, Amount, Price, Total)
                VALUES (?, ?, ?, ?, ?)
            `;
            await pool.query(insertCartQuery,[userID, foodID, quantity, price, total]);
            return { status: 'added',userID, foodID, quantity, price, total };
        } else {
            // Item exists in cart, update the quantity
            quantity = existingItem.Amount + 1;
            total = price * quantity;

            const updateCartQuery = `
                UPDATE cart 
                SET Amount = ?, Total = ?
                WHERE UserID = ? AND IDFood = ?
            `;
            await pool.query(updateCartQuery, [quantity, total,userID, foodID]);
            return { status: 'updated',userID, foodID, quantity, price, total };
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        return { status: 'error', message: 'An error occurred while adding to the cart.', error };
    }
}

//remove item from cart 
async function rm_itemFromCart(pool, iduser, idfood) {
    try {
        // Use the helper function to check if the item exists in the cart
        const existingItem = await checkItemInCart(pool, iduser, idfood);

        if (!existingItem) {
            return { status: 'not_found', message: `Item with food ID ${idfood} for user ${iduser} not found in cart.` };
        }

        // Item exists, proceed with deletion
        const deleteQuery = `
            DELETE FROM cart 
            WHERE UserID = ? AND IDFood = ?;
        `;
        await pool.query(deleteQuery, [iduser, idfood]);

        return { status: 'deleted', message: `Item with food ID ${idfood} has been removed from the cart.` };
    } catch (error) {
        console.error('Error deleting from cart:', error);
        return { status: 'error', message: 'An error occurred while deleting the item from the cart.', error };
    }
}

//Update item amount
async function updateItem(pool, userID, foodID, quantity) {
    try {
        // Check if the item exists in the cart
        const existingItem = await checkItemInCart(pool, userID, foodID);
        
        if (!existingItem) {
            return { status: 'not_found', message: `Item with food ID ${foodID} for user ${userID} not found in cart.` };
        }

        // Get the price of the food item
        const price = existingItem.Price;
        
        // Calculate the total
        const total = price * quantity;

        // Prepare the update query
        const updateQuery = `
            UPDATE cart 
            SET Amount = ?, Total = ? 
            WHERE UserID = ? AND IDFood = ?;
        `;
        
        const values = [quantity, total, userID, foodID];
        
        // Execute the update query
        await pool.query(updateQuery, values);
        
        return { status: 'updated', userID, foodID, quantity, price, total };
    } catch (error) {
        console.error('Error updating item in cart:', error);
        return { status: 'error', message: 'An error occurred while updating the item in the cart.', error };
    }
}



module.exports = {
	makePool,
	get_all_cakes,
	get_cake,
	//login and signup
	Login,
	signUp,
	//cart 
	addCart,
	rm_itemFromCart,
	updateItem

};
