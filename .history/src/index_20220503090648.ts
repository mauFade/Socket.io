import express from "express";
import socket from "socket.io";
import http from "http";

const PORT = 8099;
const app = express();
app.use(express.static(__dirname + "../index.html"));
const httpServer = http.createServer(app);
const io = socket(httpServer, {
  path: "socket.io",
});

const clients: Array<any> = [];

io.on("connection", (client) => {
  console.info(`Client connected ${client.id}`);
  clients.push(client);

  client.on("disconnect", () => {
    clients.splice(clients.indexOf(client), 1);
    console.info(`Client disconnected ${client.id}`);
  });
});

httpServer.listen(PORT, () => {
  console.info(`Socket server listening on port ${PORT}`);
});
