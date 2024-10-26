const { pool } = require("./connection");



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
            status BOOLEAN DEFAULT TRUE,
            governing varchar(100),
            PRIMARY KEY (id)
    );`
      );
      return results;
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
  
  const getAdmin = async (userId) => {
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
  
  const getAdmins = async (governing) => {
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
        `UPDATE users SET status = ? WHERE id = ?`,
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
          type varchar(200) NOT NULL,
          PRIMARY KEY (id)
  );`
      );
      return results;
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
    type
  ) => {
    try {
      console.log(
        user_device,
        name,
        email,
        message_category_id,
        governing_body_id,
        type
      );
  
      const result = await pool.query(
        `INSERT INTO mobile_users(user_device, name,email,message_category_id,governing_body_id,type) VALUES(?, ?, ?, ?, ?, ?)`,
        [user_device, name, email, message_category_id, governing_body_id, type]
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
          governing_body_id varchar(200),
          PRIMARY KEY (id)
  );`
      );
      return results;
    } catch (error) {
      console.error(error);
    }
  };


  const createRoom = async (
    mobile_user_id,
    mobile_user_name,
    operator_id,
    message_category_id,
    governing_body_id
  ) => {
    try {
      // Insert a new room
      const result = await pool.query(
        `INSERT INTO room (mobile_user_id, mobile_user_name, operator_id, message_category_id, governing_body_id) VALUES (?, ?, ?, ?, ?)`,
        [
          mobile_user_id,
          mobile_user_name,
          operator_id,
          message_category_id,
          governing_body_id,
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




  module.exports = {
    createTableRoom,
    createRoom,
    updateRoomStatus,
    createMessageTable,
    createMessage,
    getUser,
    UseDatabase,
  };