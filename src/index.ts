import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {    cors: {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"]
}})

console.log("hello")
io.on("connection", socket => {  
  socket.on("message",args =>{
    socket.broadcast.emit("recmessage", args);
  })
  let allUsers: { id: string; username: any; room: any; }[] = [];
  socket.on("someroom", args =>{
    socket.join(args.room)
    let room = args.room;
    let username = args.name
    allUsers.push({ id: socket.id, username, room });
    let chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit('chatroom_users', chatRoomUsers);
    socket.emit('chatroom_users', chatRoomUsers);
  })
});


httpServer.listen(4000, function() {
  console.log(`Listening on port 4000`);
});