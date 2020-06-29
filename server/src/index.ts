import bodyParser from "body-parser";
import logger from "morgan";
import cors from "cors";
import { Server as SocketIOServer } from "socket.io";
import { defaultRoutes } from "./routes/defaultRoutes";
import server from "./server";

server.app.use(cors());
server.app.use(bodyParser.json());
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(logger("dev"));

// It will store the information of the rooms, which means that
// it will store an array of socket ids of different rooms
let users = {};
// It will store info about which socket id is associated with which room
let socketToRoom = {};

const handleIO = (io: SocketIOServer): void => {
  io.on("connection", (socket) => {
    socket.on("join room", (roomID) => {
      if (users[roomID]) {
        const length = users[roomID].length;
        if (length === 4) {
          socket.emit("room full");
          return;
        }
        users[roomID].push(socket.id);
      } else {
        users[roomID] = [socket.id];
      }
      socketToRoom[socket.id] = roomID;
      const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);
      socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", (payload) => {
      io.to(payload.userToSignal).emit("user joined", {
        signal: payload.signal,
        callerID: payload.callerID,
      });
    });

    socket.on("returning signal", (payload) => {
      io.to(payload.callerID).emit("receiving returned signal", {
        signal: payload.signal,
        id: socket.id,
      });
    });

    socket.on("disconnect", () => {
      const roomID = socketToRoom[socket.id];
      let room = users[roomID];
      if (room) {
        room = room.filter((id) => id !== socket.id);
        users[roomID] = room;
        io.emit("user left", socket.id);
      }
    });
  });
};

(async () => {
  server.mountRoutes(defaultRoutes);
  server.mountIOServer(handleIO);
  await server.startServer();
})();
