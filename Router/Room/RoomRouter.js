const { Router } = require("express");
const RoomController = require("../../Controller/Room/RoomController");
const { CreateRoom, ActiveRoom, getRoom } = require("../../Middleware/Room");
// const { getRoom } = require("../../Service/Room/RoomService");


const RoomRouter = Router();
//CreateRoom,
RoomRouter.post("/create",RoomController.createRoom)
//ActiveRoom,
RoomRouter.post("/active",RoomController.activeRoom)
//ActiveRoom,
RoomRouter.post("/deactive",RoomController.deactiveRoom)
//getRoom,
RoomRouter.get("/get/rooms/operator/:id",RoomController.getRoom)
//getRoom,
RoomRouter.get("/get/rooms/user/:id",RoomController.getRoomByUser)

RoomRouter.post("/get/for/user",RoomController.getRoomForUser)

module.exports = RoomRouter