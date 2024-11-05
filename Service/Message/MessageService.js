// const { createMessage } = require("../../DB/controller");
const moment = require('moment');

const { UseDatabase, createMessage,getMessagesByRoomId,updateMessageSituation } = require("../../DB/controller");

const MessageService = {
  messageSituation: async (message_id) => {
    try {
      await UseDatabase();
      const results = await updateMessageSituation(message_id);
      console.log(results,"results");
      
      return results;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  getMessages: async (room_id) => {
    try {
      await UseDatabase();
      const results = await getMessagesByRoomId(room_id);
      return results;
    } catch (error) {
      console.error(error);
      return false;
    } 
  },
  send: async (room_id, writer_id, content, writer) => {
    try {
      await UseDatabase();
      const created_at = moment().format("YYYY-MM-DD HH:mm:ss");
      const results = await createMessage(room_id, writer_id, content, writer,created_at);
      return { message: "Message sent successfully",message:results };
    } catch (error) {
      console.error(error);
      return false;
    }
  },
};

module.exports = MessageService;
