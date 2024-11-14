const { Router } = require("express");
const MessageController = require("../../Controller/Message/MessageController");
const { createMessage } = require("../../Middleware/Message");

const MessageRouter = Router();
//createMessage,
MessageRouter.post("/create", MessageController.send);
MessageRouter.post("/update/situation", MessageController.messageSituation);
MessageRouter.get("/get/messages/:room_id", MessageController.getMessages);

module.exports = MessageRouter;
