const express = require("express");
const path = require("path");
const { Socket } = require("socket.io");

const app = express();
const port = 5000
const server = require("http").createServer(app);

const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname+"/public")));

io.on("connection", function(socket){
    socket.on(" newuser",function(username){
        socket.broadcast.emit(" update", username + " joined the chat");
    });
    socket.on(" exituser",function(username){
        socket.broadcast.emit(" update", username + " left the chat");
    });
    socket.on(" chat",function(message){
        socket.broadcast.emit(" chat", message);
    });
});

server.listen(5000);

app.listen(process.env.PORT || port, () => console.log(`listening on port ${port}`))
