// const { createMessage } = require("../../DB/controller");

const { UseDatabase, createMessage } = require("../../DB/controller");

const MessageService = {
  send: async (room_id, writer_id, content, type) => {
    try {
      await UseDatabase();

      const results = await createMessage(room_id, writer_id, content, type);
      return { message: "Message sent successfully" };
    } catch (error) {
      console.error(error);
      return false;
    }
  },
};

module.exports = MessageService;
