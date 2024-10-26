const { Router } = require("express");
const RoomController = require("../../Controller/Room/RoomController");


const RoomRouter = Router();

RoomRouter.post("/create",RoomController.createRoom)
RoomRouter.post("/active",RoomController.activeRoom)
RoomRouter.post("/deactive",RoomController.deactiveRoom)

module.exports = RoomRouter