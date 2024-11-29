const AdminService = require("../../Service/Admin/AdminService");
const UserService = require("../../Service/User/UserService");



const AdminController = {
  authMe: async (req, res) => {
    try {
      const auth = req.headers.authorization;
      const id = auth.split(" ")[1];

      const result = await AdminService.authMe(id);
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
  onlineExist: async (req, res) => {
    try {
      const { governing_id } = req.body;
      const result = await AdminService.onlineExist(governing_id);
      if (result[0]) {
        res.status(200).send({ message: "success" , operator: result[0]});
      } else {
        res.status(200).send({ message: "error" ,operator:[]});
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Error");
    }
  },
  uptadeSocketId: async (req, res) => {
    try {
      const { id, socket_id } = req.body;
      const result = await AdminService.uptadeSocketId(id, socket_id);
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
      getAdminByGoverning: async (req, res) => {
        try {
        
          const {governing}=req.params
      
          
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
          const online = true;
          const result = await AdminService.register(
            name,
            surname,
            email,
            password,
            phone,
            online,
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