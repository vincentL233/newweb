var express = require('express');
var server = express();
server.get("/",(req,res)=>{
    res.send("Hello World");
})

server.get("/about",(req,res)=>{
    res.send("first server");
});
server.listen(8080);