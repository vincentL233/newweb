var express = require('express');
var bodyParser = require('body-parser');
var server = express();

server.use(express.static(__dirname + "/public"));
server.use(bodyParser.urlencoded());
server.get("/",(req,res)=>{
    res.send("Hello World");
})

server.get("/about",(req,res)=>{
    res.send("first server");
});
server.listen(8080);