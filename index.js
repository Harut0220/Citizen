const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const Route = require("./Router/Router");
const {getMessagesByRoomId,getAdminById,updateRoomStatus, getUser,UseDatabase,getRoomByOperatorId,getActivByGoverningOperator,createRoom ,findRoomExist} = require("./DB/controller");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  pingInterval: 25000, 
  pingTimeout: 10000,
  cors: {
    origin: ["http://localhost:3000","http://localhost:3001"], // Ensure this matches your frontend
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
UseDatabase();

io.on("connection", (socket) => {
  console.log("connected", socket.id); // This should log when a socket connects
  let currentRoom = null

  socket.emit("me", socket.id)

  socket.on("disconnect", (data)=>{
    console.log("socket-disconnect ----",socket.id)
  })
  io.on("disconnect", (data)=>{
    console.log("io--socket-disconnect ----",socket.id)
  })

  socket.on("operatorJoin",(data)=>{
    socket.join(data.id)
  })

  socket.on("searchAdmin", async(data)=>{
    const activOperator=await getActivByGoverningOperator(data.governing_body_id)
    console.log("active-----",activOperator);
    console.log("data-------",data);
    const rooms=[];
    let existRooms=[];
    for (let i = 0; i < activOperator.length; i++) {
      let obj={}
      const room=await getRoomByOperatorId(activOperator[i].id)
      obj.operator=activOperator[i]
      obj.activRooms=room
      rooms.push(obj)
      console.log("func-arg-----",data.id,data.name,activOperator[i].id,data.message_category_id,data.governing_body_id);
     const existRoom=await findRoomExist(data.id,data.name,activOperator[i].id,data.message_category_id,data.governing_body_id)
     console.log("cikl exist------",existRoom);
      if(existRoom.length){
        existRooms.push(existRoom[0])
      }
    }
    rooms.sort((a,b)=>a.activRooms.length-b.activRooms.length)



    console.log("isexistto-----",existRooms);
    console.log("type-exist-array",Array.isArray(existRooms))
    if(existRooms.length){

      console.log("room-exist",existRooms[0]);
      currentRoom = existRooms[0].id
      socket.join(existRooms[0].id)

      
          const userName=await getUser(existRooms[0].mobile_user_id);
          const operator=await getAdminById(existRooms[0].operator_id)
          existRooms[0].email=userName[0].email
          console.log("findedUser-----",userName);
          console.log("findedOperator-----",operator);

          const messages=await getMessagesByRoomId(existRooms[0].id);
          const room=await updateRoomStatus(existRooms[0].id, true);
          room.messages=messages
          console.log("changeExistroom-----",room);

      console.log("find exist-----",operator[0].socket_id);
      io.to(operator[0].socket_id).emit("operatorNewJoin",{room:room, new:false})
      // io.to(operator.socket_id).emit("operatorOldRoomConnect",existRooms)
    }else{
      const room=await createRoom(data.id,data.name,rooms[0].operator.id,data.message_category_id,data.governing_body_id,data.email)
      console.log("room-not-exist",room);
      currentRoom = room.id
      socket.join(room.id)
      console.log("operator_socket------",rooms[0].operator.socket_id);
      console.log("user_socket-------",data.socket_id);
      room.messages=[]
      // socket.to(room.id).emit("roomCreated",{room:room.id})
      socket.to(rooms[0].operator.socket_id).emit("operatorNewJoin",{room, new:true})
    }

  })


  socket.on("create_message",(data)=>{
    console.log("message-----",data);
    io.to(data.room_id).emit("receive_message",data)
  })

  socket.on("joinUser",(data)=>{
    console.log("joinUser------",data);
    io.to(data.id).emit("roomCreated",{room:data.id})
  })

  socket.on("markMessageAsRead", (data) => {
    io.to(data.id).emit("messageRead", data);
  });

  socket.on("markMessageAsReadUser", (data) => {
    io.to(data.id).emit("messageReadUser", data);
  });

  socket.on("userMessageWasReaded",(data)=>{
    console.log("userMessageAlreadyReaded----",data);
    io.to(data.id).emit("userMessageAlreadyReaded",data)
  })
  socket.on("operatorMessageWasReaded",(data)=>{
    io.to(data.id).emit("operatorMessageAlreadyReaded",data)
  })



});



app.use("/api", Route);


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// module.exports=pool


