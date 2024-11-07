const { Router } = require("express");
const RoomController = require("../../Controller/Room/RoomController");
const { CreateRoom, ActiveRoom, getRoom } = require("../../Middleware/Room");
// const { getRoom } = require("../../Service/Room/RoomService");


const RoomRouter = Router();

RoomRouter.post("/create",CreateRoom,RoomController.createRoom)
RoomRouter.post("/active",ActiveRoom,RoomController.activeRoom)
RoomRouter.post("/deactive",ActiveRoom,RoomController.deactiveRoom)
RoomRouter.get("/get/rooms/operator/:id",getRoom,RoomController.getRoom)
RoomRouter.get("/get/rooms/user/:id",getRoom,RoomController.getRoomByUser)

module.exports = RoomRouter