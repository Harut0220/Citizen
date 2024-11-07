const { Router } = require("express");
const UserController = require("../../Controller/User/UserController");
const { UserUpdateSocketId, UserAuth } = require("../../Middleware/user");

const UserRouter = Router();

UserRouter.post("/register", UserAuth,UserController.UserRegister);
UserRouter.post("/getById/:id", UserController.getUser);
UserRouter.post("/update/socketId",UserUpdateSocketId,UserController.uptadeSocketId)
module.exports = UserRouter