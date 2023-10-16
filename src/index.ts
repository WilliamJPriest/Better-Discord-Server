import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {    cors: {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  
}

})
declare module 'socket.io' {
  interface Socket {
    username?: string;
  }
}

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});

io.on("connection", (socket) => {
  let users: any[] = []; //true to render theiser socket in react
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  socket.emit("users", users);

  socket.on("private message", ({ content, to }) => {
    console.log(to)
    socket.to(to).emit("private messages", {
      content
      // from: socket.id,
    });
  });

  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,
  })
  // console.log("hi")
});

//   socket.on("online", (user) =>{
//     // onlineUsers.push(user)
//     // console.log(onlineUsers)
//     // user = onlineUsers
//     console.log(user)
//     socket.emit("onlineU",(user))
//   })

  
//   socket.on("message",(args, tacos) =>{
   
//     args.socket_id = socket.id 
//     console.log(args)
//     tacos ="tacos"
//     socket.broadcast.emit("recmessage", (args),(tacos));
//     // socket.emit("onlineU",(args)) works on send
//   })



httpServer.listen(4000, function() {
  console.log(`Listening on port 4000`);
});