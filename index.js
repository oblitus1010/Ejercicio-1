//Antes de comenzar
//1--Instalamos yarn
//2-- Y realizamos los siguientes comandos
//3-- npm init
//4-- yarn add express
//5-- yarn add socket.io
//6-- yarn add ejs
//Universitario : Briyan Julio Torrez Vargas
//Lic: Gallardo
//Instalamos los modulos necesarios
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", function(req, res) {
  res.render("index.ejs");
});

io.sockets.on("connection", function(socket) {
  socket.on("username", function(username) {
    socket.username = username;
    io.emit("is_online", "🔵 <i>" + socket.username + " se une al chat..</i>");
  });

  socket.on("disconnect", function(username) {
    io.emit(
      "is_online",
      "🔴 <i>" + socket.username + " ha dejado el chat ..</i>"
    );
  });

  socket.on("chat_message", function(message) {
    io.emit(
      "chat_message",
      "<strong>" + socket.username + "</strong>: " + message
    );
  });
});

const server = http.listen(8080, function() {
  console.log("Escuchando en el puerto 8080");
});