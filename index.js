const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const Route = require("./Router/Router");
const {getMessagesByRoomId,getAdminById, getUser,UseDatabase,getRoomByOperatorId,getActivByGoverningOperator,createRoom ,findRoomExist} = require("./DB/controller");
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
    for (let i = 0; i < activOperator.length; i++) {
      let obj={}
      const room=await getRoomByOperatorId(activOperator[i].id)
      obj.operator=activOperator[i]
      obj.activRooms=room
      rooms.push(obj)
    }
    rooms.sort((a,b)=>a.activRooms.length-b.activRooms.length)
    const existRoom=await findRoomExist(data.id,data.name,rooms[0].operator.id,data.message_category_id,data.governing_body_id)
    console.log("isexistto-----",existRoom);
    console.log("type-exist-array",Array.isArray(existRoom))
    if(!Array.isArray(existRoom)){

      console.log("room-exist",existRoom);
      currentRoom = existRoom.id
      socket.join(existRoom.id)

      
          const userName=await getUser(existRoom.mobile_user_id);
          const operator=await getAdminById(existRoom.operator_id)
          existRoom.email=userName[0].email
          console.log("findedUser-----",userName);
          console.log("findedOperator-----",operator);

          const messages=await getMessagesByRoomId(existRoom.id);
          existRoom.messages=messages
          console.log("changeExistroom-----",existRoom);


      // io.to(operator.socket_id).emit("operatorNewJoin",{room:existRoom, new:false})
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


