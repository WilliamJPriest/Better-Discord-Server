import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {    cors: {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"]
}})

// type OnlineUsersType= {
//   name: string;
// }
let onlineUsers: {name: string; }[] = [];
io.on("connection", socket => {     
  console.log(socket.id)

  socket.on("online", user =>{
    // onlineUsers.push({"name": user})
    // console.log(onlineUsers)
    // user = onlineUsers
    console.log(user)
    socket.emit("onlineU",user)
  })

  
  socket.on("message",(args, tacos) =>{
   
    args.socket_id = socket.id 
    console.log(args)
    tacos ="tacos"
    socket.emit("recmessage", (args),(tacos));
  })

});


httpServer.listen(4000, function() {
  console.log(`Listening on port 4000`);
});