const express =require("express");
const app = express();
const server =require("http").Server(app);
const io=require("socket.io")(server);
const FPS=10;
app.get('/student',(req,res)=>{
    res.sendFile(__dirname+"/htmlpages/student.html");
})
app.get('/teacher',(req,res)=>{
    res.sendFile(__dirname+"/htmlpages/teacher.html");
})
io.on('connection',function(socket){
    socket.on('stream',function(image){
        socket.broadcast.emit("image",image);
    });
});
const port=3000;
const host="127.0.0.1" 
server.listen(port,host);