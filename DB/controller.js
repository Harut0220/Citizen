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
const createAdminUserTable = async () => {
  try {
    const results = await pool.query(
      `create table users(
            id INT AUTO_INCREMENT,
            name varchar(255) NOT NULL,
            surname varchar(255) NOT NULL,
            email varchar(255) NOT NULL,
            email_verified_at timestamp NULL DEFAULT NULL,
            password varchar(255),
            phone varchar(255) NOT NULL,
            status tinyint(1) NOT NULL DEFAULT '1',
            password_changes_at varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
            remember_token varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
            socket_id varchar(255) DEFAULT NULL,
            online BOOLEAN DEFAULT FALSE,
            deleted_at TIMESTAMP NULL DEFAULT NULL,
            created_at TIMESTAMP NULL DEFAULT NULL,
            updated_at TIMESTAMP NULL DEFAULT NULL,
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
    console.log(governing,"dbGoverning");
    
    const query = `SELECT * FROM users WHERE id = '${governing}' AND online = 1;`;
    const [results] = await pool.query(query);
    return results;
  } catch (error) {
    console.error(error);
  }
}

const updateSocketIdAdmin = async (id, socket_id) => {
  try {
    const updated_at = moment.tz(process.env.TZ).format("YYYY-MM-DD HH:mm:ss");

    // First, update the socket_id
    await pool.query(
      `UPDATE users SET socket_id = ?, updated_at = ? WHERE id = ?`,
      [socket_id,updated_at, id]
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
  
    
    let query = `SELECT * FROM users`;
    let params = [];
    
    if (governing) {
      query += ` WHERE governing = ?`; // Add condition if userId is provided
      params.push(governing);
    }

    const [results] = await pool.query(query, params);
    console.log(results, "results");
    
    return results;
  } catch (error) {
    console.error(error);
  }
};

const getAdminsByGoverningAndOnline = async (governing) => {
  try {
    const query = `SELECT * FROM users WHERE governing = ? AND online = true`;
    const [results] = await pool.query(query, [governing]);
    return results;
  } catch (error) {
    console.error("Error fetching admins by governing and online status:", error);
    throw error;
  }
};

const updateAdminStatus = async (userId, newStatus) => {
  try {
    const updated_at = moment.tz(process.env.TZ).format("YYYY-MM-DD HH:mm:ss");

    // Update the user's online status
    await pool.query(
      `UPDATE users SET online = ?, updated_at = ? WHERE id = ?`,
      [newStatus,updated_at, userId]
    );

    // Retrieve and return the updated user data
    const [updatedUser] = await pool.query(
      `SELECT * FROM users WHERE id = ?`,
      [userId]
    );

    return updatedUser[0]; // Return the updated user record
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

const createUserTable = async () => {
  try {
    const results = await pool.query(
      `CREATE TABLE mobile_users(
          id INT AUTO_INCREMENT,
          device_id varchar(255) NOT NULL,
          name varchar(255) NOT NULL,
          phone_number varchar(255) NOT NULL,
          email varchar(255) NOT NULL,
          message_category_id BIGINT UNSIGNED NOT NULL,
          activ BOOLEAN DEFAULT TRUE,
          governing_body_id BIGINT UNSIGNED NOT NULL,
          socket_id varchar(255) NOT NULL,
          type varchar(255) NOT NULL,
          deleted_at TIMESTAMP NULL DEFAULT NULL,
          created_at TIMESTAMP NULL DEFAULT NULL,
          updated_at TIMESTAMP NULL DEFAULT NULL,
          PRIMARY KEY (id)
  );`
    );
    //type = Android,IOS
    return results;
  } catch (error) {
    console.error(error);
  }
};


const updateSocketIdUser = async (id, socket_id) => {
  try {
    const updated_at = moment.tz(process.env.TZ).format("YYYY-MM-DD HH:mm:ss");

    // First, update the socket_id
    await pool.query(
      `UPDATE mobile_users SET socket_id = ?, updated_at = ? WHERE id = ?`,
      [socket_id,updated_at, id]
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
  device_id,
  name,
  phone_number,
  email,
  message_category_id,
  governing_body_id,
  socket_id,
  type,
  created_at
) => {
  try {
    console.log(
      device_id,
      name,
      phone_number,
      email,
      message_category_id,
      governing_body_id,
      socket_id,
      type,
      created_at
    );

    const result = await pool.query(
      `INSERT INTO mobile_users(device_id, name,phone_number,email,message_category_id,governing_body_id,socket_id,type,created_at) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [device_id, name,phone_number, email, message_category_id, governing_body_id,socket_id, type,created_at]
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

const getUserByEmailExist = async (email) => {
  try {
    let query = `SELECT * FROM mobile_users`;
    let params = [];

    if (email) {
      query += ` WHERE email = ?`; // Add condition if userId is provided
      params.push(email);
    }

    const [results] = await pool.query(query, params);
    return results;
  } catch (error) {
    console.error(error);
  }
};



/////////////////// ROOM

const createTableRoom = async (room_id, writer_id, content, type) => {
  try {
    const results = await pool.query(
      `CREATE TABLE rooms(
          id INT AUTO_INCREMENT,
          mobile_user_id BIGINT UNSIGNED NOT NULL,
          mobile_user_name varchar(255) NOT NULL,
          operator_id BIGINT UNSIGNED NOT NULL,
          message_category_id BIGINT UNSIGNED NOT NULL,
          activ BOOLEAN DEFAULT TRUE,
          governing_body_id BIGINT UNSIGNED NOT NULL,
          email varchar(255) NOT NULL,
          deleted_at TIMESTAMP NULL DEFAULT NULL,
          created_at TIMESTAMP NULL DEFAULT NULL,
          updated_at TIMESTAMP NULL DEFAULT NULL,
          PRIMARY KEY (id)
  );`
    );
    return results;
  } catch (error) {
    console.error(error);
  }
};

const getRoomByOperatorIdChat=async(operatorId)=>{
  try {
    const query = `
        SELECT * 
        FROM rooms
        WHERE operator_id = ?;`;
    const [rows] = await pool.query(query, [operatorId]);
    return rows;
} catch (error) {
    console.error('Error retrieving messages:', error);
    throw error;
  }
}

const getRoomByUserDeviceIdChat=async(mobile_user_id)=>{
  try {
    const query = `
        SELECT * 
        FROM rooms 
        WHERE mobile_user_id = ?;`;
    const [rows] = await pool.query(query, [mobile_user_id]);
    return rows;
} catch (error) {
    console.error('Error retrieving messages:', error);
    throw error;
  }
}


const getRoomByOperatorId = async (operatorId) => {
  try {
    const query = `
        SELECT * 
        FROM rooms 
        WHERE operator_id = ? AND activ = 1;`;
    const [rows] = await pool.query(query, [operatorId]);
    return rows;
  } catch (error) {
    console.error('Error retrieving messages:', error);
    throw error;
  }
}

const getRoomById = async (roomId) => {
  try {
    const query = `
        SELECT * 
        FROM rooms 
        WHERE operator_id = ?;`;
    const [rows] = await pool.query(query, [roomId]);
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
  governing_body,
  email,
  created_at
) => {
  try {
    // Insert a new room
    const result = await pool.query(
      `INSERT INTO rooms (mobile_user_id, mobile_user_name, operator_id, message_category_id, governing_body_id,email,created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        mobile_user_id,
        mobile_user_name,
        operator_id,
        message_category_id,
        governing_body,
        email,
        created_at
      ]
    );

    // Get the last inserted room's ID
    const newRoomId = result[0].insertId;

    // Retrieve the newly inserted room data, if needed
    const [rows] = await pool.query(`SELECT * FROM rooms WHERE id = ?`, [
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
        FROM rooms 
        WHERE mobile_user_id = ? 
          AND mobile_user_name = ?
          AND operator_id = ?
          AND message_category_id = ?
          AND governing_body_id = ?;`;
    const [rows] = await pool.query(query, [mobile_user_id, mobile_user_name,operator_id,message_category_id,governing_body_id]);
    return rows;
} catch (error) {
    console.error('Error retrieving messages:', error);
    throw error;
}
}


const updateRoomStatus = async (roomId, newStatus) => {
  try {
    // const newStatus = true;
    const updated_at = moment.tz(process.env.TZ).format("YYYY-MM-DD HH:mm:ss");

    // Update the message status
    await pool.query(`UPDATE rooms SET activ = ?, updated_at = ? WHERE id = ?`, [
      newStatus,
      updated_at,
      roomId
    ]);

    // Retrieve the updated message
    const [results] = await pool.query(`SELECT * FROM rooms WHERE id = ?`, [
      roomId,
    ]);

    return results[0]; // Return the first (and only) result
  } catch (error) {
    console.error(error);
    throw error; // Optionally rethrow error for handling by the caller
  }
};

//////////////// MESSAGE

const createMessageTable = async () => {
  try {
    const results = await pool.query(
      `CREATE TABLE messages(
          id INT AUTO_INCREMENT,
          room_id INT NOT NULL,
          writer_id BIGINT UNSIGNED NOT NULL,
          content varchar(255) NOT NULL,
          writer varchar(255) NOT NULL,
          readed BOOLEAN DEFAULT FALSE,
          deleted_at TIMESTAMP NULL DEFAULT NULL,
          created_at TIMESTAMP NULL DEFAULT NULL,
          updated_at TIMESTAMP NULL DEFAULT NULL,
          PRIMARY KEY (id)
  );`
    );
    return results;
  } catch (error) {
    console.error(error);
  }
};

const createMessage = async (room_id, writer_id, content, writer,created_at) => {
  try {
    const result = await pool.query(
      `INSERT INTO messages(room_id, writer_id, content, writer,created_at) VALUES(?, ?, ?, ?, ?)`,
      [room_id, writer_id, content, writer,created_at]
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

const updateMessageSituation = async (message_id) => {
  try {
    const newStatus = true;
    console.log("message_id",message_id);
    const updated_at = moment.tz(process.env.TZ).format("YYYY-MM-DD HH:mm:ss");

    // Update the message status
    await pool.query(`UPDATE messages SET readed = ?, updated_at = ? WHERE id = ?`, [
      newStatus,
      updated_at,
      message_id
    ]);

    // Retrieve the updated message
    const [results] = await pool.query(`SELECT * FROM messages WHERE id = ?`, [
      message_id,
    ]);
    console.log(results[0],"results[0]");
    
    return results[0]; // Return the first (and only) result
  } catch (error) {
    console.error(error);
    throw error; // Optionally rethrow error for handling by the caller
  }
};


const getMessagesByRoomId = async (roomId) => {
  try {
    let query = `SELECT * FROM messages`;
    let params = [];

    if (roomId) {
      query += ` WHERE room_id = ?`; // Filter by roomId if provided
      params.push(roomId);
    }

    // Add ORDER BY clause to sort by 'created_at' in ascending order
    query += ` ORDER BY created_at ASC`;

    const [results] = await pool.query(query, params);
    return results;
  } catch (error) {
    console.error(error);
  }
};


const getRole=async(role_name)=>{
  try {
    let query = `SELECT * FROM roles`;
    let params = [];

    if (role_name) {
      query += ` WHERE name = ?`; // Add condition if userId is provided
      params.push(role_name);
    }

    const [results] = await pool.query(query, params);
    return results;
  } catch (error) {
    console.error(error);
  }
}

const getModelHasRole=async(role_id)=>{
  try {
    let query = `SELECT * FROM model_has_roles`;
    let params = [];

    if (role_id) {
      query += ` WHERE role_id = ?`; // Add condition if userId is provided
      params.push(role_id);
    }

    const [results] = await pool.query(query, params);
    return results;
  } catch (error) {
    console.error(error);
  }
}



const getGoverningBody=async(role_id)=>{
  try {
    let query = `SELECT * FROM governing_body_users`;
    let params = [];

    if (role_id) {
      query += ` WHERE governing_body_id = ?`; // Add condition if userId is provided
      params.push(role_id);
    }

    const [results] = await pool.query(query, params);
    return results;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getGoverningBody,
  getModelHasRole,
  getRole,
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
  getRoomByOperatorId,
  getRoomByOperatorIdChat,
  updateMessageSituation,
  getAdminsByGoverningAndOnline,
  getUserByEmailExist,
  getRoomByUserDeviceIdChat,
  getRoomById
};
