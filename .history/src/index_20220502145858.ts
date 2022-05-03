import express from "express";
import socket from "socket.io";
import http from "http";

const app = express();
const httpServer = http.createServer(app);
const io = socket(httpServer, {
  path: "socket.io",
});

app.listen(3008);
