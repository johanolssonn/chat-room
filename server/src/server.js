import express from "express";
import socket from "socket.io";

const app = express();
const port = 3200;

const activeChatters = [];

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const io = socket(server);
io.on("connection", (socket) => {
  console.log(`Connected to ${socket.id}`);

  socket.on('join', (data) => {
    activeChatters.push(data.name);
    console.log(data.name, 'joined the room.')
    socket.broadcast.emit('join', data)
    io.sockets.emit("active", activeChatters);
    console.log('Active chatters:' , activeChatters)
  })

  socket.on("chat", (data) => {
    console.log(`${data.name} sent a message.`)
    io.sockets.emit("chat", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });

  socket.on("stoppedtyping", (data) => {
    socket.broadcast.emit("stoppedtyping", data);
  });

  socket.on("left", (data) => {
    socket.broadcast.emit("left", data);
    console.log(data.name, "left the room.")
    removeChatter(data.name);
    io.sockets.emit("active", activeChatters);
    console.log('Active chatters:' , activeChatters)
  });
});

const removeChatter = (chatter) => {
  const idx = activeChatters.indexOf(chatter);
  if(idx !== -1) {
    activeChatters.splice(idx, 1);
  }
}
