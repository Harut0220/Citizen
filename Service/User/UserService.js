const { createUser, createAdminUser, getUserByEmail, updateUserStatus } = require("../../DB/controller");
const bcrypt=require("bcryptjs")
const UserService = {
  UserRegister: async (user_device, name,email,message_category_id,governing_body_id,type) => {
    try {
      await createUser(user_device, name,email,message_category_id,governing_body_id,type);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  statusOnline: async (id) => {
    try {
      await updateUserStatus(id, true);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } 
  },
  statusOffline: async (id) => {
    try {
      await updateUserStatus(id, false);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  login: async (email, password) => {
    try {
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
  register: async (name,surname,email,password,phone,status,governing) => {
    try {
      let salt = bcrypt.genSaltSync(8);
      password = bcrypt.hashSync(password, salt);
      await createAdminUser(name,surname,email,password,phone,status,governing);
      return { message: "User created successfully" };
    } catch (error) {
      console.error(error);
      return false;
    }
  },
};

module.exports = UserService;

