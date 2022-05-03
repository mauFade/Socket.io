import express from "express";
import socket from "socket.io";
import http from "http";

const PORT = 8099;
const app = express();
app.use(express.static(__dirname + "/../public"));
const httpServer = http.createServer(app);
const io = socket(httpServer, {
  path: "/socket.io",
});

const clients: Array<any> = [];

io.on("connection", (client: any) => {
  console.info(`Client connected ${client.id}`);
  clients.push(client);

  client.on("disconnect", () => {
    clients.splice(clients.indexOf(client), 1);
    console.info(`Client disconnected ${client.id}`);
  });
});

app.get("/msg", (req, res) => {
  const { msg }: { msg: string } = Object(req["query"]) || "";
  for (const client of clients) {
    client.emit("msg", msg);
  }

  return res.json({ success: true });
});

httpServer.listen(PORT, () => {
  console.info(`Socket server listening on port ${PORT}`);
});
