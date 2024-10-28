const { Router } = require("express");
const AdminController = require("../../Controller/Admin/AdminController");

const AdminRouter = Router();

AdminRouter.get("/by/governing",AdminController.getAdminByGoverning)
AdminRouter.get("/getById/:id",AdminController.getAdminUser)
AdminRouter.post("/register",AdminController.register)
AdminRouter.post("/login",AdminController.login)
AdminRouter.post("/status/offline",AdminController.statusOffline)
AdminRouter.post("/status/online",AdminController.statusOnline)
AdminRouter.post("/update/socketId",AdminController.uptadeSocketId)


module.exports = AdminRouter