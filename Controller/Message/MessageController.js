const MessageService = require("../../Service/Message/MessageService");

const MessageController = {
  send: async (req, res) => {
    try {
      // const { room_id, writer_id, content, type } = req.body;
      const room_id = "afg";
      const writer_id = "afg";
      const content = "afg";
      const type = "afg";
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
