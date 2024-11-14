// const { updateRoomStatus,createRoom } = require("../../DB/controller");

const { UseDatabase,createMessage, updateRoomStatus, createRoom, getUserName, getAdminById, getUser, getUserByNmaeAndId, getRoomByOperatorIdChat, getMessagesByRoomId, getRoomByUserDeviceIdChat } = require("../../DB/controller");
const moment = require('moment');


const RoomService = {
    getRoomByUser: async (user_id) => {
        try {
            await UseDatabase();
            const rooms = await getRoomByUserDeviceIdChat(user_id);
            for (let i = 0; i < rooms.length; i++) {
                const userName=await getUser(rooms[i].mobile_user_id);
                rooms[i].email=userName[0].email
                const messages=await getMessagesByRoomId(rooms[i].id);
                rooms[i].messages=messages
            }
            return rooms
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    getRoom: async (operatorId) => {
        try {
            await UseDatabase();
            const rooms=await getRoomByOperatorIdChat(operatorId);
            console.log(rooms,"room");
            for (let i = 0; i < rooms.length; i++) {
                const userName=await getUser(rooms[i].mobile_user_id);
                rooms[i].email=userName[0].email
                const messages=await getMessagesByRoomId(rooms[i].id);
                rooms[i].messages=messages
            }
            return rooms
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    deactiveRoom: async (id) => {
        try {
            await UseDatabase();

            const created_at = moment().format("YYYY-MM-DD HH:mm:ss");
            const results = await createMessage(id, 0, "Room closed", "closed",created_at);
            const room=await updateRoomStatus(id, false);

            const message=await getMessagesByRoomId(id)
            room.messages=message
            return room
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    activeRoom: async (id) => {
        try {
            await UseDatabase();

            const room=await updateRoomStatus(id, true);
            return room
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    createRoom: async (mobile_user_id,mobile_user_name, operator_id, message_category_id, governing_body_id) => {
        try {
            await UseDatabase();
            // const existUser=await getUserByNmaeAndId(mobile_user_id);
            const existUserName=await getUserByNmaeAndId(mobile_user_id,mobile_user_name);
            const existOperator=await getAdminById(operator_id);
            // console.log(existUser,"existUser");
            console.log(existUserName,"existUserName");
            console.log(existOperator,"existOperator");
            if(existUserName.length&&existOperator.length){
                const created_at = moment.tz(process.env.TZ).format("YYYY-MM-DD HH:mm:ss");

                const room=await createRoom(mobile_user_id,mobile_user_name, operator_id, message_category_id, governing_body_id,existUserName[0].email,created_at);
                return room
            }else{
                return ({message:"User and Operator not found"});
            }
            
        } catch (error) {
            console.error(error);
            return false;
        }

    }
}


module.exports = RoomService