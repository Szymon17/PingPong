import http from "http";
import { Server } from "socket.io";

const PORT = 8000;
const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

server.listen(PORT);

io.on("connection", socket => {
  console.log("user connected");
});
