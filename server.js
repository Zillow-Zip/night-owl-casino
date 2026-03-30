const express = require("express");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static(path.join(__dirname, "public")));

let users = {
  "ILopez91": {
    pass: "MyNightOwl0821",
    chips: 1000000000,
    isAdmin: true
  }
};

let fish = [];

setInterval(()=>{
  fish.push({x:-50,y:Math.random()*400,speed:2,type:Math.random()>0.95?"boss":"normal"});
},1000);

setInterval(()=>{
  fish.forEach(f=>f.x+=f.speed);
  io.emit("state",{fish});
},50);

io.on("connection", socket=>{
  socket.on("login", data=>{
    if(users[data.user] && users[data.user].pass===data.pass){
      socket.emit("loginSuccess", users[data.user]);
    } else socket.emit("loginFail");
  });

  socket.on("chatMessage", msg=>{
    io.emit("chatMessage",{user:"User",text:msg});
  });
});

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"public/index.html"));
});

http.listen(3000,()=>console.log("running"));