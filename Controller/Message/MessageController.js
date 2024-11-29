const moment = require("moment");
const MessageService = require("../../Service/Message/MessageService");

const MessageController = {
  messageSituation: async (req, res) => {
    try {
      const { message_id } = req.body;
      const result = await MessageService.messageSituation(message_id);
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(403).send("Error");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating message situation");
    }
  },
  getMessages: async (req, res) => {
    try {
      const { room_id } = req.params;
      const result = await MessageService.getMessages(room_id);
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(403).send("Error");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Error getting messages");
    }
  },
  send: async (req, res) => {
    try {
      const { room_id, writer_id, content, writer } = req.body;
      console.log("Sending message keys",{room_id, writer_id, content, writer} );
      
      const result = await MessageService.send(
        room_id,
        writer_id,
        content,
        writer,
        
      );
      if (result) {
        console.log("Message sent-------", result);
        
        res.status(200).send(result);
      } else {
        res.status(403).send("Error");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Error sending message");
    }
  },
};

module.exports = MessageController;
