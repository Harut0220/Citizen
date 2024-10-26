// const { updateRoomStatus,createRoom } = require("../../DB/controller");



const RoomService = {
    deactiveRoom: async (id) => {
        try {
            const room=await updateRoomStatus(id, false);
            return room
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    activeRoom: async (id) => {
        try {
            const room=await updateRoomStatus(id, true);
            return room
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    createRoom: async (mobile_user_id,mobile_user_name, operator_id, message_category_id, governing_body_id) => {
        try {
            const room=await createRoom(mobile_user_id,mobile_user_name, operator_id, message_category_id, governing_body_id);
            return room
        } catch (error) {
            console.error(error);
            return false;
        }

    }
}


module.exports = RoomService