// const pool = require("../index");
const pool = require("./connection");

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

const getUser = async (userId) => {
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


const createAdminUser=async(name,surname,email,password,phone,status,governing)=>{
  try {
    const results = await pool.query(
      `INSERT INTO users(name,surname,email,password,phone,governing) VALUES('${name}', '${surname}', '${email}', '${password}', '${phone}',  '${governing}')`
    );
    return results;
  } catch (error) {
    console.error(error);
  }
}


const updateUserStatus = async (userId, newStatus) => {
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

const getAdminUser = async (userId) => {
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
const createUser = async (user_device, name,email,message_category_id,governing_body_id,type) => {
  try {
    console.log(user_device, name,email,message_category_id,governing_body_id,type);
    
    const results = await pool.query(
      `INSERT INTO mobile_users(user_device, name,email,message_category_id,governing_body_id,type) VALUES('${user_device}', '${name}','${email}', '${message_category_id}', '${governing_body_id}', '${type}')`
    );
    return results;
  } catch (error) {
    console.error(error);
  }
};

const createMessage = async (room_id, writer_id, content, type) => {
  try {
    const results = await pool.query(
      `INSERT INTO messages(room_id, writer_id, content, type) VALUES('${room_id}', '${writer_id}', '${content}', '${type}')`
    );
    return results;
  } catch (error) {
    console.error(error);
  }
};

const createTable = async (room_id, writer_id, content, type) => {
  try {
    const results = await pool.query(
      `CREATE TABLE room(
        id INT AUTO_INCREMENT,
        mobile_user varchar(200) NOT NULL,
        user_id varchar(2000) NOT NULL,
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

const getUserByEmail = async (email) => {
  try {
    const query = `SELECT * FROM users WHERE email = ?`;
    const [results] = await pool.query(query, [email]);

    return results.length > 0 ? results[0] : null; // Return the user if found, otherwise null
  } catch (error) {
    console.error("Error retrieving user by email:", error);
  }
};

module.exports = {
  createUser,
  createMessage,
  createAdminUser,
  updateUserStatus,
  getUser,
  getUserByEmail
};
