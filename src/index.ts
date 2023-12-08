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
  // const socketID = socket.handshake.auth.sessionID
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});

io.on("connection", (socket) => {
  let users: any[] = []; 
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    }); 
    io.emit("users", users);
  }

  console.log(users)
  socket.on("disconnect", () => {
    users = users.filter((user) => user.userID !== socket.id);
    console.log(users)
    io.emit("users", users);
  })

 

  socket.on("privateMessage", ({ messages,to}) => {
    console.log(to)
    console.log("help")
    console.log(messages)
    socket.to(to).emit("privateMessages",(messages)) 
    // {
    //   content
    //   // from: socket.id,
    // });
  });

})


httpServer.listen(4000, function() {
  console.log(`Listening on port 4000`);
})
