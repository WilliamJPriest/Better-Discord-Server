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
});


httpServer.listen(4000, function() {
  console.log(`Listening on port 4000`);
});