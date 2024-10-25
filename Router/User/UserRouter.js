const { Router } = require("express");
const UserController = require("../../Controller/User/UserController");

const UserRouter = Router();

UserRouter.post("/register", UserController.UserRegister);



UserRouter.post("/admin/register", UserController.register);
UserRouter.post("/admin/login", UserController.login);
UserRouter.post("/admin/status/offline/:id", UserController.statusOffline);
UserRouter.post("/admin/status/online/:id", UserController.statusOnline);

module.exports = UserRouter;
