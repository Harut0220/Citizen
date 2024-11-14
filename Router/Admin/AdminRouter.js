const { Router } = require("express");
const AdminController = require("../../Controller/Admin/AdminController.js");
const { AdminByGoverning, AdminByGoverningByBody, AdminRegister, AdminAuth, AdminUpdateSocketId } = require("../../Middleware/Admin.js");
// const { AdminByGoverning } = require("../../Middleware/Admin");

const AdminRouter = Router();
//AdminByGoverning,
AdminRouter.get("/by/governing/:governing",AdminController.getAdminByGoverning)
//AdminByGoverningByBody,
AdminRouter.post("/online/exist",AdminController.onlineExist)
AdminRouter.get("/getById/:id",AdminController.getAdminUser)
//AdminRegister,
AdminRouter.post("/register",AdminController.register)
AdminRouter.post("/login",AdminController.login)
//AdminAuth,
AdminRouter.post("/status/offline",AdminController.statusOffline)
//AdminAuth,
AdminRouter.post("/status/online",AdminController.statusOnline)
//AdminUpdateSocketId,
AdminRouter.post("/update/socketId",AdminController.uptadeSocketId)


module.exports = AdminRouter