const { Router } = require("express");
const UserRouter = require("./User/UserRouter");
const AdminRouter = require("./Admin/AdminRouter");
const MessageRouter = require("./Message/MessageRouter");

const Route = Router();

Route.use("/user",UserRouter);
Route.use("/admin",AdminRouter);
Route.use("/message", MessageRouter);

module.exports = Route;
