const UserService = require("../../Service/User/UserService");

const UserController = {
  getUser: async (req, res) => {
    try {
      const result = await UserService.getUser(req.params.id);
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(403).send("Error");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Error");
    }
  },
  UserRegister: async (req, res) => {
    try {
      const {user_device,name,email,message_category_id,governing_body_id,type,} = req.body;
      console.log(
        user_device,);
      
      const result = await UserService.UserRegister(
        user_device,
        name,
        email,
        message_category_id,
        governing_body_id,
        type
      );
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(403).send("Error");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Error");
    }
  },




};

module.exports = UserController;
