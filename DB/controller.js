// const { pool } = require("./connection");
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    // ssl: true,
  })
  .promise();

  console.log("Connected to MySQL database");


const UseDatabase = async () => {
  try {
    const results = await pool.query(`USE citizen;`);
    return results;
  } catch (error) {
    console.error(error);
  }
};

/////////////////// ADMIN
const createAdminUserTable = async (device_id, type) => {
  try {
    const results = await pool.query(
      `create table users(
            id INT AUTO_INCREMENT,
            name varchar(200) NOT NULL,
            surname varchar(2000) NOT NULL,
            email varchar(200) NOT NULL,
            password varchar(1000),
            phone varchar(200) NOT NULL,
            socket_id varchar(200) DEFAULT NULL,
            status BOOLEAN DEFAULT TRUE,
            governing varchar(100),
            online BOOLEAN DEFAULT FALSE,
            PRIMARY KEY (id)
    );`
    );
    return results;
  } catch (error) {
    console.error(error);
  }
};

const getActivByGoverningOperator = async (governing) => {
  try {
    const query = `SELECT * FROM users WHERE governing = '${governing}' AND status = 1;`;
    const [results] = await pool.query(query);
    return results;
  } catch (error) {
    console.error(error);
  }
}

const updateSocketIdAdmin = async (id, socket_id) => {
  try {
    // First, update the socket_id
    await pool.query(
      `UPDATE users SET socket_id = ? WHERE id = ?`,
      [socket_id, id]
    );

    // Then, retrieve the updated data
    const [updatedUser] = await pool.query(
      `SELECT * FROM users WHERE id = ?`,
      [id]
    );

    return updatedUser;
  } catch (error) {
    console.error(error);
  }
};

const createAdminUser = async (
  name,
  surname,
  email,
  password,
  phone,
  status,
  governing
) => {
  try {
    const result = await pool.query(
      `INSERT INTO users(name,surname,email,password,phone,governing) VALUES(?, ?, ?, ?, ?, ?)`,
      [name, surname, email, password, phone, governing]
    );

    const newUserId = result[0].insertId;

    // Retrieve the newly inserted room data, if needed
    const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [
      newUserId,
    ]);
    return rows[0];
  } catch (error) {
    console.error(error);
  }
};

const getAdminById = async (userId) => {
  try {
    let query = `SELECT * FROM users`;
    let params = [];

    if (userId) {
      query += ` WHERE id = ?`; // Add condition if userId is provided
      params.push(userId);
    }

    const [results] = await pool.query(query, params);
    return results;
  } catch (error) {
    console.error(error);
  }
};

const getAdminsByGoverning = async (governing) => {
  try {
    const query = `SELECT * FROM users WHERE governing = '${governing}'`;
    const [results] = await pool.query(query);
    return results;
  } catch (error) {
    console.error(error);
  }
};

const updateAdminStatus = async (userId, newStatus) => {
  try {
    const results = await pool.query(
      `UPDATE users SET online = ? WHERE id = ?`,
      [newStatus, userId]
    );
    return results;
  } catch (error) {
    console.error(error);
  }
};

const getUserByEmail = async (email) => {
  try {
    const query = `SELECT * FROM users WHERE email = ?`;
    const [results] = await pool.query(query, [email]);

    return results.length > 0 ? results[0] : null; // Return the user if found, otherwise null
  } catch (error) {
    console.error("Error retrieving user by email:", error);
  }
};

/////////////////// USER

const createUserTable = async (device_id, type) => {
  try {
    const results = await pool.query(
      `CREATE TABLE mobile_users(
          id INT AUTO_INCREMENT,
          user_device varchar(200) NOT NULL,
          name varchar(2000) NOT NULL,
          email varchar(200) NOT NULL,
          message_category_id varchar(200) NOT NULL,
          activ BOOLEAN DEFAULT TRUE,
          governing_body_id varchar(200),
          socket_id varchar(200) NOT NULL,
          type varchar(200) NOT NULL,
          PRIMARY KEY (id)
  );`
    );
    return results;
  } catch (error) {
    console.error(error);
  }
};


const updateSocketIdUser = async (id, socket_id) => {
  try {
    // First, update the socket_id
    await pool.query(
      `UPDATE mobile_users SET socket_id = ? WHERE id = ?`,
      [socket_id, id]
    );

    // Then, retrieve the updated data
    const [updatedUser] = await pool.query(
      `SELECT * FROM mobile_users WHERE id = ?`,
      [id]
    );

    return updatedUser;
  } catch (error) {
    console.error(error);
  }
};

const createUser = async (
  user_device,
  name,
  email,
  message_category_id,
  governing_body_id,
  socket_id,
  type
) => {
  try {
    console.log(
      user_device,
      name,
      email,
      message_category_id,
      governing_body_id,
      socket_id,
      type
    );

    const result = await pool.query(
      `INSERT INTO mobile_users(user_device, name,email,message_category_id,governing_body_id,socket_id,type) VALUES(?, ?, ?, ?, ?, ?, ?)`,
      [user_device, name, email, message_category_id, governing_body_id,socket_id, type]
    );
    const newUserId = result[0].insertId;

    // Retrieve the newly inserted room data, if needed
    const [rows] = await pool.query(`SELECT * FROM mobile_users WHERE id = ?`, [
      newUserId,
    ]);

    return rows[0];
  } catch (error) {
    console.error(error);
  }
};
const getUser = async (userId) => {
  try {
    let query = `SELECT * FROM mobile_users`;
    let params = [];

    if (userId) {
      query += ` WHERE id = ?`; // Add condition if userId is provided
      params.push(userId);
    }

    const [results] = await pool.query(query, params);
    return results;
  } catch (error) {
    console.error(error);
  }
};

const getUserName=async(userId)=>{
  try {
    let query = `SELECT * FROM mobile_users`;
    let params = [];

    if (userId) {
      query += ` WHERE name = ?`; // Add condition if userId is provided
      params.push(userId);
    }

    const [results] = await pool.query(query, params);
    return results;
  } catch (error) {
    console.error(error);
  }
}

const getUserByNmaeAndId = async (id,name) => {
  try {
    console.log(id,name,"/////////////");
    
    const query = `
        SELECT * 
        FROM mobile_users 
        WHERE id = ? 
          AND name = ?;`;
    const [rows] = await pool.query(query, [id,name]);
    return rows;
} catch (error) {
    console.error('Error retrieving messages:', error);
    throw error;
}
}



/////////////////// ROOM

const createTableRoom = async (room_id, writer_id, content, type) => {
  try {
    const results = await pool.query(
      `CREATE TABLE room(
          id INT AUTO_INCREMENT,
          mobile_user_id varchar(200) NOT NULL,
          mobile_user_name varchar(200) NOT NULL,
          operator_id varchar(2000) NOT NULL,
          message_category_id varchar(200) NOT NULL,
          activ BOOLEAN DEFAULT TRUE,
          governing_body varchar(200),
          PRIMARY KEY (id)
  );`
    );
    return results;
  } catch (error) {
    console.error(error);
  }
};


const getRoomByOperatorId = async (operatorId) => {
  try {
    const query = `
        SELECT * 
        FROM room 
        WHERE operator_id = ? AND activ = 1;`;
    const [rows] = await pool.query(query, [operatorId]);
    return rows;
  } catch (error) {
    console.error('Error retrieving messages:', error);
    throw error;
  }
}

const createRoom = async (
  mobile_user_id,
  mobile_user_name,
  operator_id,
  message_category_id,
  governing_body
) => {
  try {
    // Insert a new room
    const result = await pool.query(
      `INSERT INTO room (mobile_user_id, mobile_user_name, operator_id, message_category_id, governing_body) VALUES (?, ?, ?, ?, ?)`,
      [
        mobile_user_id,
        mobile_user_name,
        operator_id,
        message_category_id,
        governing_body,
      ]
    );

    // Get the last inserted room's ID
    const newRoomId = result[0].insertId;

    // Retrieve the newly inserted room data, if needed
    const [rows] = await pool.query(`SELECT * FROM room WHERE id = ?`, [
      newRoomId,
    ]);

    return rows[0]; // Return the newly created room data
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
};

const findRoomExist = async(mobile_user_id, mobile_user_name,operator_id,message_category_id,governing_body_id)=> {
  try {
    const query = `
        SELECT * 
        FROM room 
        WHERE mobile_user_id = ? 
          AND mobile_user_name = ?
          AND operator_id = ?
          AND message_category_id = ?
          AND governing_body = ?;`;
    const [rows] = await pool.query(query, [mobile_user_id, mobile_user_name,operator_id,message_category_id,governing_body_id]);
    return rows;
} catch (error) {
    console.error('Error retrieving messages:', error);
    throw error;
}
}


const updateRoomStatus = async (roomId, newStatus) => {
  try {
    const results = await pool.query(`UPDATE room SET activ = ? WHERE id = ?`, [
      newStatus,
      roomId,
    ]);
    return results;
  } catch (error) {
    console.error(error);
  }
};

//////////////// MESSAGE

const createMessageTable = async () => {
  try {
    const results = await pool.query(
      `CREATE TABLE messages(
          id INT AUTO_INCREMENT,
          room_id varchar(200) NOT NULL,
          writer_id varchar(2000) NOT NULL,
          content varchar(200) NOT NULL,
          type varchar(20) NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (id)
  );`
    );
    return results;
  } catch (error) {
    console.error(error);
  }
};

const createMessage = async (room_id, writer_id, content, type) => {
  try {
    const result = await pool.query(
      `INSERT INTO messages(room_id, writer_id, content, type) VALUES(?, ?, ?, ?)`,
      [room_id, writer_id, content, type]
    );
    const newMessageId = result[0].insertId;

    // Retrieve the newly inserted room data, if needed
    const [rows] = await pool.query(`SELECT * FROM messages WHERE id = ?`, [
      newMessageId,
    ]);

    return rows[0];
  } catch (error) {
    console.error(error);
  }
};

const getMessagesByRoomId = async (roomId) => {
  try {
    let query = `SELECT * FROM messages`;
    let params = [];

    if (roomId) {
      query += ` WHERE room_id = ?`; // Add condition if userId is provided
      params.push(roomId);
    }

    const [results] = await pool.query(query, params);
    return results;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createAdminUser,
  createTableRoom,
  createRoom,
  updateRoomStatus,
  createMessageTable,
  createMessage,
  getUser,
  UseDatabase,
  getAdminsByGoverning,
  getAdminById,
  getUserByEmail,
  updateAdminStatus,
  getMessagesByRoomId,
  findRoomExist,
  getUserName,
  getUserByNmaeAndId,
  createUser,
  updateSocketIdUser,
  updateSocketIdAdmin,
  getActivByGoverningOperator,
  getRoomByOperatorId
};
