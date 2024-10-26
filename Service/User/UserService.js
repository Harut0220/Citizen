// const {createUser, getUser, getAdmins } = require("../../DB/controller");

const { UseDatabase } = require("../../DB/controller");


const UserService = {

  getUser: async (userId) => {
    try {
      await UseDatabase();
      const users = await getUser(userId);
      return users;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  UserRegister: async (user_device, name,email,message_category_id,governing_body_id,type) => {
    try {
      await UseDatabase();

     const result = await createUser(user_device, name,email,message_category_id,governing_body_id,type);
      return result;
    } catch (error) {
      console.error(error);
      return false;
    }
  },




};

module.exports = UserService;

