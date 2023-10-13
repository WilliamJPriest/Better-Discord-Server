import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {    cors: {
  origin: "http://localhost:5174",
  methods: ["GET", "POST"]
}})

// type OnlineUsersType= {
//   name: string;
// }
let onlineUsers: {name: string; }[] = [];
io.on("connection", socket => {     
  console.log(socket.id)

  socket.on("online", user =>{
    onlineUsers.push({name: user})
    console.log(onlineUsers)
    socket.emit("onlineU",onlineUsers)
  })
  socket.on("message",args =>{
    console.log(args)
    socket.broadcast.emit("recmessage", args);
  })

});


httpServer.listen(4000, function() {
  console.log(`Listening on port 4000`);
});