// const { updateRoomStatus,createRoom } = require("../../DB/controller");

const { UseDatabase, updateRoomStatus, createRoom, getUserName, getAdminById, getUser, getUserByNmaeAndId } = require("../../DB/controller");



const RoomService = {
    deactiveRoom: async (id) => {
        try {
            await UseDatabase();
            const room=await updateRoomStatus(id, false);
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
                const room=await createRoom(mobile_user_id,mobile_user_name, operator_id, message_category_id, governing_body_id);
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