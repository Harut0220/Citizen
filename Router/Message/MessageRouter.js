const { Router } = require("express");
const MessageController = require("../../Controller/Message/MessageController");

const MessageRouter = Router();

MessageRouter.post("/create", MessageController.send);

module.exports = MessageRouter;
