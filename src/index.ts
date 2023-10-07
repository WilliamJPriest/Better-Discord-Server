import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

console.log("hello")
io.on("connection", (socket: { id: any; }) => {
  console.log(socket.id)
});

httpServer.listen(3000);