const MessageService = require("../../Service/Message/MessageService");

const MessageController = {
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
      const { room_id, writer_id, content, type } = req.body;

      const result = await MessageService.send(
        room_id,
        writer_id,
        content,
        type
      );
      if (result) {
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
