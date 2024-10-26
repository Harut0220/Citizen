const RoomService = require("../../Service/Room/RoomService");


const RoomController = {
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
            const result = await RoomService.createRoom( mobile_user_id,mobile_user_name, operator_id, message_category_id, governing_body_id );
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
};

module.exports = RoomController