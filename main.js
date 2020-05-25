const express =require("express");
const app = express();
const httpserver =require("http").Server(app);
const socketIo=require("socket.io")(httpserver);
//*************************file server section*****************************
// use http://localhost:3000/student for viewing video stream
app.get('/student',(req,res)=>{
    res.sendFile(__dirname+"/htmlpages/student.html");
})
// use http://localhost:3000/teacher and let the camera turn on for produce video stream  
app.get('/teacher',(req,res)=>{
    res.sendFile(__dirname+"/htmlpages/teacher.html");
})
//*************************END file server section*****************************
//*************************stream server section*****************************
socketIo.on('connection',function(socket){
    socket.on('stream',function(image){
        socket.broadcast.emit("streamimage",image);
    });
});
//*************************END stream server section*****************************
// If you have changed the port and host, make a change in ./htmlpages/teacher.html & ./htmlpages/student.html
const port=3000;
const host="127.0.0.1" 
httpserver.listen(port,host);