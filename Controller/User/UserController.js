const UserService = require("../../Service/User/UserService");

const UserController = {
  UserRegister: async (req, res) => {
    try {
      const {
        user_device,
        name,
        email,
        message_category_id,
        governing_body_id,
        type,
      } = req.body;
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
  statusOnline: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await UserService.statusOnline(id);
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
  statusOffline: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await UserService.statusOffline(id);
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
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await UserService.login(email, password);
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(403).send({ message: "email or password incorrect" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Error logging in");
    }
  },
  register: async (req, res) => {
    try {
      const { name, surname, email, password, phone, governing } = req.body;
      const status = true;
      const result = await UserService.register(
        name,
        surname,
        email,
        password,
        phone,
        status,
        governing
      );
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(403).send("Error");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Error registering user");
    }
    // const { email, id, type } = req.body;
  },
};

module.exports = UserController;
