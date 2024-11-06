// const { getAdmins, getUserByEmail, getAdmin, createAdminUser, updateAdminStatus } = require("../../DB/controller");
const bcrypt=require("bcryptjs");
const { UseDatabase,getAdminsByGoverningAndOnline, getAdminsByGoverning, getAdminById, createAdminUser, getUserByEmail, updateAdminStatus, updateSocketIdAdmin } = require("../../DB/controller");


const AdminService = { 
  onlineExist: async (governing) => {
    try {
      await UseDatabase();
      const users = await getAdminsByGoverningAndOnline(governing);
      return users;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  uptadeSocketId: async (id, socketId) => {
    try {
      await UseDatabase();
      const result = await updateSocketIdAdmin(id, socketId);
      return result[0];
    } catch (error) {
      console.error(error);
      return false;
    }
  } ,
    getAdminByGoverning: async (governing) => {
        try {
          await UseDatabase();

          const users = await getAdminsByGoverning(governing);
          return users;
        } catch (error) {
          console.error(error);
          return false;
        }
      },
      getAdminUser: async (userId) => {
        try {
          await UseDatabase();

          const users = await getAdminById(userId);
          return users;
        } catch (error) {
          console.error(error);
          return false;
        }
      },
      register: async (name,surname,email,password,phone,online,governing) => {
        try {
          await UseDatabase();

          let salt = bcrypt.genSaltSync(8);
          password = bcrypt.hashSync(password, salt);
          await createAdminUser(name,surname,email,password,phone,online,governing);
          return { message: "User created successfully" };
        } catch (error) {
          console.error(error);
          return false;
        }
      },
      login: async (email, password) => {
        try {
          await UseDatabase();

          const user = await getUserByEmail(email);
          let passCheck = await bcrypt.compare(password, user.password);
          console.log(user);
          
          console.log(passCheck);
          if (passCheck) {
            return user;
          } else {
            return false;
          }
        } catch (error) {
          console.error(error);
          return false;
        }
      },
      statusOffline: async (id) => {
        try {
          await UseDatabase();

          await updateAdminStatus(id, false);
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      },
      statusOnline: async (id) => {
        try {
          await UseDatabase();

          const result=await updateAdminStatus(id, true);

          return result;
        } catch (error) {
          console.error(error);
          return false;
        } 
      },
};

module.exports = AdminService