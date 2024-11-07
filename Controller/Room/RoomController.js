const { findRoomExist, getRoomById } = require("../../DB/controller");
const RoomService = require("../../Service/Room/RoomService");


const RoomController = {
    getRoomByUser: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await RoomService.getRoomByUser(id);
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(403).send("Error");
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Error");
        }
    },
    getRoom: async (req, res) => {
        try {
            const {id} = req.params;
            const getRoomDb=await getRoomById(id);
            if (getRoomDb.length) {
                const result = await RoomService.getRoom(id);
                if (result) {
                    res.status(200).send(result);
                } else {
                    res.status(403).send("Error");
                } 
            }else{
                res.status(404).send({message:"Room not found"});
            }

        } catch (error) {
            console.error(error);
            res.status(500).send("Error");
        }
    },
    deactiveRoom: async (req, res) => {
        try {
            const { id } = req.body;
            const result = await RoomService.deactiveRoom(id);
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(403).send("Error");
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Error");
        }
    },
    activeRoom: async (req, res) => {
        try {
            const { id } = req.body;
            const result = await RoomService.activeRoom(id);
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(403).send("Error");
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Error");
        }
    },
    createRoom: async (req, res) => {
        try {
            const { mobile_user_id,mobile_user_name, operator_id, message_category_id, governing_body_id } = req.body;
            const existRoom=await findRoomExist( mobile_user_id,mobile_user_name, operator_id, message_category_id, governing_body_id );
            console.log(existRoom,"existRoom");
            if (!existRoom.length) {
            const result = await RoomService.createRoom( mobile_user_id,mobile_user_name, operator_id, message_category_id, governing_body_id );
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(403).send("Error");
            }
            }else{
                res.status(200).send(existRoom[0]);
            }

        } catch (error) {
            console.error(error);
            res.status(500).send("Error");
        }
    },
};

module.exports = RoomController