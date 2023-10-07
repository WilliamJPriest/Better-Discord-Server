import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {  cors: {
  origin: "*",//temp
}})

console.log("hello")
io.on("connection", (socket) => {
  socket.emit("hello", "yo");
});

httpServer.listen(4000, function() {
  console.log(`Listening on port 4000`);
});