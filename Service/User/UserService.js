// const {createUser, getUser, getAdmins } = require("../../DB/controller");


const UserService = {

  getAdminUsers: async () => {
    try {
      const users = await getAdmins();
      return users;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  getUser: async (userId) => {
    try {
      const users = await getUser(userId);
      return users;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  UserRegister: async (user_device, name,email,message_category_id,governing_body_id,type) => {
    try {
      await createUser(user_device, name,email,message_category_id,governing_body_id,type);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },




};

module.exports = UserService;

