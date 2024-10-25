const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const UserRouter = require("./Router/User/UserRouter");
const MessageRouter = require("./Router/Message/MessageRouter");
// const connection=require("./DB/connection")
// const pool=connection()
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000","http://localhost:3001"], // Ensure this matches your frontend
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  console.log("connected", socket.id); // This should log when a socket connects

  socket.emit("me", socket.id)
  // Handle other socket events...
});



app.use("/user", UserRouter);
app.use("/message", MessageRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// module.exports=pool


