const AdminService = require("../../Service/Admin/AdminService");
const UserService = require("../../Service/User/UserService");



const AdminController = {
      getAdminByGoverning: async (req, res) => {
        try {
          const {governing} = req.query
          const result = await AdminService.getAdminByGoverning(governing);
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
      getAdminUser: async (req, res) => {
        try {
          const result = await AdminService.getAdminUser(req.params.id);
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
      register: async (req, res) => {
        try {
          const { name, surname, email, password, phone, governing } = req.body;
          const status = true;
          const result = await AdminService.register(
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
      login: async (req, res) => {
        try {
          const { email, password } = req.body;
          const result = await AdminService.login(email, password);
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
      statusOffline: async (req, res) => {
        try {
          const { id } = req.body;
          const result = await AdminService.statusOffline(id);
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
          const { id } = req.body;
          const result = await AdminService.statusOnline(id);
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

module.exports = AdminController