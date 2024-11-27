const { Router } = require("express");
const UserController = require("../../Controller/User/UserController");
const { UserUpdateSocketId, UserAuth } = require("../../Middleware/User");

const UserRouter = Router();
//UserAuth,
UserRouter.post("/register", UserController.UserRegister);
UserRouter.post("/getById/:id", UserController.getUser);
//UserUpdateSocketId,
UserRouter.post("/update/socketId",UserController.uptadeSocketId)
module.exports = UserRouter