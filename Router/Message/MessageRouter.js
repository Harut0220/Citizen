const { Router } = require("express");
const MessageController = require("../../Controller/Message/MessageController");

const MessageRouter = Router();

MessageRouter.post("/create", MessageController.send);
MessageRouter.post("/update/situation", MessageController.messageSituation);
MessageRouter.get("/get/messages/:room_id", MessageController.getMessages);

module.exports = MessageRouter;
