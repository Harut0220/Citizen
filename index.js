const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const Route = require("./Router/Router");
const moment = require("moment-timezone");
const {
  getMessagesByRoomId,
  getAdminById,
  updateRoomStatus,
  getUser,
  UseDatabase,
  getRoomByOperatorId,
  getActivByGoverningOperator,
  createRoom,
  findRoomExist,
  getRole,
  getModelHasRole,
  getGoverningBody,
} = require("./DB/controller");
const { default: corsOptions } = require("./config/corsOptions.js");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  pingInterval: 25000,
  pingTimeout: 10000,
  cors: {
    origin: ["https://citizenw.trigger.ltd", "http://localhost:8081"], // Ensure this matches your frontend
    methods: ["GET", "POST"],
  },
});
// const firebaseJson=require("./firebase.json");

app.use(cors()); //corsOptions
app.use(express.json());
UseDatabase();

io.on("connection", (socket) => {
  console.log("connected", socket.id); // This should log when a socket connects
  let currentRoom = null;

  socket.emit("me", socket.id);

  socket.on("disconnect", (data) => {
    console.log("socket-disconnect ----", socket.id);
  });
  io.on("disconnect", (data) => {
    console.log("io--socket-disconnect ----", socket.id);
  });

  socket.on("operatorJoin", (data) => {
    socket.join(data.id);
  });

  socket.on("searchAdmin", async (data) => {
    // const activOperator=await getActivByGoverningOperator(data.governing_body_id)
    const governingBody = await getGoverningBody(data.governing_body_id);
    console.log(governingBody);

    let activOperator = [];
    for (let z = 0; z < governingBody.length; z++) {
      console.log("governingBody[z].user_id", governingBody[z].user_id);

      const activOperators = await getActivByGoverningOperator(
        governingBody[z].user_id
      );
      if (activOperators[0]) {
        activOperator.push(activOperators[0]);
      }
    }
    console.log("active-----", activOperator);
    console.log("data-------", data);
    const rooms = [];
    let existRooms = [];
    for (let i = 0; i < activOperator.length; i++) {
      let obj = {};
      const room = await getRoomByOperatorId(activOperator[i].id);
      console.log("room-----", room);

      obj.operator = activOperator[i];
      obj.activRooms = room;
      rooms.push(obj);
      console.log(
        "func-arg-----",
        data.id,
        data.name,
        activOperator[i].id,
        data.message_category_id,
        data.governing_body_id
      );
      const existRoom = await findRoomExist(
        data.id,
        data.name,
        activOperator[i].id,
        data.message_category_id,
        data.governing_body_id
      );
      console.log("cikl exist------", existRoom);
      if (existRoom.length) {
        existRooms.push(existRoom[0]);
      }
    }
    rooms.sort((a, b) => a.activRooms.length - b.activRooms.length);

    console.log("isexistto-----", existRooms);
    console.log("type-exist-array", Array.isArray(existRooms));
    if (existRooms.length) {
      console.log("room-exist", existRooms[0]);
      currentRoom = existRooms[0].id;
      socket.join(existRooms[0].id);

      const userName = await getUser(existRooms[0].mobile_user_id);
      const operator = await getAdminById(existRooms[0].operator_id);
      existRooms[0].email = userName[0].email;
      console.log("findedUser-----", userName);
      console.log("findedOperator-----", operator);

      const messages = await getMessagesByRoomId(existRooms[0].id);
      const room = await updateRoomStatus(existRooms[0].id, true);
      room.messages = messages;
      console.log("changeExistroom-----", room);
      socket.emit('roomId', { id: existRooms[0].id });
      console.log("find exist-----", operator[0].socket_id);
      io.to(operator[0].socket_id).emit("operatorNewJoin", {
        room: room,
        new: false,
      });
      io.to(data.id).emit("roomCreated", { room: data.id });
      // io.to(operator.socket_id).emit("operatorOldRoomConnect",existRooms)
    } else {
      const room = await createRoom(
        data.m_user_id,
        data.id,
        data.name,
        rooms[0].operator.id,
        data.message_category_id,
        data.governing_body_id,
        data.email
      );
      console.log("room-not-exist", room);
      currentRoom = room.id;
      socket.join(room.id);
      console.log("rooms[0].operator.socket_id", rooms[0].operator.socket_id);

      console.log("operator_socket------", rooms[0].operator.socket_id);
      console.log("user_socket-------", data.socket_id);
      room.messages = [];
      // socket.to(room.id).emit("roomCreated",{room:room.id})
      socket
        .to(rooms[0].operator.socket_id)
        .emit("operatorNewJoin", { room, new: true });
    }
    io.to(data.id).emit("roomCreated", { room: data.id });
  });

  socket.on("create_message", (data) => {
    console.log("message-----", data);
    io.to(data.room_id).emit("receive_message", data);
  });

  socket.on("joinUser", (data) => {
    console.log("joinUser------", data);
    // io.to(data.id).emit("roomCreated", { room: data.id });
  });

  socket.on("markMessageAsRead", (data) => {
    io.to(data.id).emit("messageRead", data);
  });

  socket.on("markMessageAsReadUser", (data) => {
    io.to(data.id).emit("messageReadUser", data);
  });

  socket.on("userMessageWasReaded", (data) => {
    console.log("userMessageAlreadyReaded----", data);
    io.to(data.id).emit("userMessageAlreadyReaded", data);
  });
  socket.on("operatorMessageWasReaded", (data) => {
    io.to(data.id).emit("operatorMessageAlreadyReaded", data);
  });

  socket.on("endRoom", async (data) => {
    console.log("endRoom------", data);
    io.to(data).emit("roomEnded", data);
  });
  
});

app.use("/api", Route);






//notification
//////////////////////////////////////////////////////
// admin.initializeApp({ 
//   credential: admin.credential.cert(firebaseJson), 
// }); 
 
// const sendPushNotification = async (user) => { 
//   const token = user.firebaseToken; 
   
//   if (!token) { 
//     console.log(`User ${user._id} does not have a firebase token`); 
//     return; 
//   } 
 
//   console.log("Sending notification to:", token); 
 
//   const message = { 
//     notification: { 
//       title: "Special Offer", 
//       body: "Try your Luck", 
//     }, 
//     token: token, 
//     data: {}, 
//     apns: { 
//       headers: { 
//         'apns-priority': '10', 
//         'apns-push-type': 'alert' 
//       }, 
//       payload: { 
//         aps: { 
//           alert: { 
//             title: "Special Offer", 
//             body: "Try your Luck", 
//           }, 
//           sound: 'default' 
//         } 
//       } 
//     }, 
//   }; 
 
//   try { 
//     const response = await admin.messaging().send(message); 
//     console.log("Successfully sent message:", response); 
//   } catch (error) { 
//     console.error("Error sending message:", error); 
 
//     // Check for the specific error regarding invalid registration tokens 
//     if (error.errorInfo && error.errorInfo.code === 'messaging/registration-token-not-registered') { 
//       console.log(`Removing invalid token for user ${user._id}`); 
//       try { 
//         // Remove or invalidate the token in the database 
//         await User.updateOne({ _id: user._id }, { $unset: { firebaseToken: 1 } }); 
//         console.log(`Token removed for user ${user._id}`); 
//       } catch (dbError) { 
//         console.error(`Error updating database for user ${user._id}:`, dbError); 
//       } 
//     } 
//   } 
// };


////////////////////////////////////////////////
//notification

//socket search admin ic data.id tox uxarki vochte mobile_user_id ayl user_id vor@ laraveli uzerica galis
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
