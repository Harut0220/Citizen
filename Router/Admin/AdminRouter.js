const { Router } = require("express");
const AdminController = require("../../Controller/Admin/AdminController.js");
const { AdminByGoverning, AdminByGoverningByBody, AdminRegister, AdminAuth, AdminUpdateSocketId } = require("../../Middleware/Admin.js");
// const { AdminByGoverning } = require("../../Middleware/Admin");

const AdminRouter = Router();

AdminRouter.get("/by/governing/:governing",AdminByGoverning,AdminController.getAdminByGoverning)
AdminRouter.post("/online/exist",AdminByGoverningByBody,AdminController.onlineExist)
AdminRouter.get("/getById/:id",AdminController.getAdminUser)
AdminRouter.post("/register",AdminRegister,AdminController.register)
AdminRouter.post("/login",AdminController.login)
AdminRouter.post("/status/offline",AdminAuth,AdminController.statusOffline)
AdminRouter.post("/status/online",AdminAuth,AdminController.statusOnline)
AdminRouter.post("/update/socketId",AdminUpdateSocketId,AdminController.uptadeSocketId)


module.exports = AdminRouter