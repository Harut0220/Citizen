// const {createUser, getUser, getAdmins } = require("../../DB/controller");

const { UseDatabase, createUser, updateSocketIdUser,getUserByEmailExist } = require("../../DB/controller");


const UserService = {
  uptadeSocketId: async (id, socketId) => {
    try {
      await UseDatabase();
      const result = await updateSocketIdUser(id, socketId);
      return result;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

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
  UserRegister: async (user_device, name,phone_number,email,message_category_id,governing_body,socket_id,type) => {
    try {
      await UseDatabase();
      const existUser=await getUserByEmailExist(email)
      console.log("exist--user",existUser);
      if(existUser[0]){
        return existUser[0]
      }else{
        const result = await createUser(user_device, name,phone_number,email,message_category_id,governing_body,socket_id,type);
        console.log("not-exist-user---",result);
        return result;
      }

    } catch (error) {
      console.error(error);
      return false;
    }
  },




};

module.exports = UserService;

