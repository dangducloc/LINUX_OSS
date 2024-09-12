require('dotenv').config();
const mysql = require('mysql2');

// Variables for pool
const host = process.env.DB_HOST || "localhost";
const user = process.env.DB_USER || "root";
const db = process.env.DB_NAME || "LINUS_OSS";
const pass = process.env.DB_PASS || "linh";

// Debugging
console.log('User:', user);
console.log('Database:', db);

// Create the pool for connection to database
const pool = mysql.createPool({
  host: host,
  user: user,       // Use the variable from the .env file
  password: pass,   // Use the password from the .env file
  database: db      // Use the database name from the .env file
});

// Query to show databases
pool.query("SHOW DATABASES;", (err, results) => {
  if (err) {
    console.error('Error querying the databases:', err);
  } else {
    console.log('Databases:', results);
  }
});
