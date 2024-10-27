// const mysql = require("mysql2");
// const dotenv = require("dotenv");

// dotenv.config();

// const connection = async () => {
//   try {
//     const pool = mysql
//       .createPool({
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_NAME,
//         port: process.env.DB_PORT,
//         // ssl: true,
//       })
//       .promise();
//     console.log("Connected to MySQL database");

//     return pool;
//   } catch (error) {
//     console.error(error);
//     throw error; // Re-throw the error to be caught by the caller
//   }
// };

// module.exports = connection;

// index.js
// const mysql = require("mysql2");
// const dotenv = require("dotenv");

// dotenv.config();

// const pool = mysql
//   .createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT,
//     ssl: true,
//   })
//   .promise();

// console.log("Connected to MySQL database");

// module.exports = pool;

