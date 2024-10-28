const { Router } = require("express");
const UserController = require("../../Controller/User/UserController");

const UserRouter = Router();

UserRouter.post("/register", UserController.UserRegister);
UserRouter.post("/getById/:id", UserController.getUser);
UserRouter.post("/update/socketId",UserController.uptadeSocketId)
module.exports = UserRouter