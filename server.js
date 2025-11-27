var express = require('express');
var bodyParser = require('body-parser');
var server = express();

var DB=require("nedb-promises");

var fileupload = require('express-fileupload');

server.set('view engine', 'ejs');
server.set("views", __dirname + "/view");

var ServerDB = DB.create(__dirname + "/Service.db");
var portfolioDB = DB.create(__dirname + "/portfolio.db");
var contactDB = DB.create(__dirname + "/contact.db");
// ServerDB.insert([
    
//     {icon:'fa-shopping-cart', title:'E-Commerce', text:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur porro laborum fuga repellat necessitatibus corporis nulla, in ex velit recusandae obcaecati maiores, doloremque quisquam similique, tempora aspernatur eligendi delectus! Rem.'},
//     {icon:'fa-laptop', title:'Responsive Design', text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.'},
//     {icon:'fa-lock', title:'Web Security', text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.'},
// ]);

// portfolioDB.insert([
//     { href: "#portfolioModal1", imgSrc: "img/portfolio/roundicons.png", title: "Round Icons", text: "Graphic Design" },
//         { href: "#portfolioModal2", imgSrc: "img/portfolio/startup-framework.png", title: "Startup Framework", text: "Website Design" },
//         { href: "#portfolioModal3", imgSrc: "img/portfolio/treehouse.png", title: "Treehouse", text: "Website Design" },
//         { href: "#portfolioModal1", imgSrc: "img/portfolio/roundicons.png", title: "Round Icons", text: "Graphic Design" },
//         { href: "#portfolioModal2", imgSrc: "img/portfolio/startup-framework.png", title: "Startup Framework", text: "Website Design" },
//         { href: "#portfolioModal3", imgSrc: "img/portfolio/treehouse.png", title: "Treehouse", text: "Website Design" }
// ]);

server.use(express.static(__dirname + "/public"));
server.use(bodyParser.urlencoded({extended: true}));
server.get("/",(req,res)=>{
    res.send("Hello World");
})
server.use(fileupload({limits:{fileSize: 2 * 1024 * 1024}}));
server.get("/services",(req,res)=>{
    // var services = [
    //     {icon:'fa-shopping-cart', title:'E-Commerce', text:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur porro laborum fuga repellat necessitatibus corporis nulla, in ex velit recusandae obcaecati maiores, doloremque quisquam similique, tempora aspernatur eligendi delectus! Rem.'},
    //     {icon:'fa-laptop', title:'Responsive Design', text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.'},
    //     {icon:'fa-lock', title:'Web Security', text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.'}
    //  ];
    ServerDB.find({},{"_id":0}).then(results=>{
        res.json(results);
    }).catch(err=>{
        console.log(err);
    })
});
server.get("/showService",(req,res)=>{
    ServerDB.find({},{"_id":0}).then(results=>{
        res.render("service",{Services:results});
    }).catch(err=>{
        console.log(err);
    })
});
server.get("/about",(req,res)=>{
    var user = req.query.user;
    res.send("welcome back :" + user);
});
server.get("/portfolio",(req,res)=>{
    // var portfolio = [
    //     { href: "#portfolioModal1", imgSrc: "img/portfolio/roundicons.png", title: "Round Icons", text: "Graphic Design" },
    //     { href: "#portfolioModal2", imgSrc: "img/portfolio/startup-framework.png", title: "Startup Framework", text: "Website Design" },
    //     { href: "#portfolioModal3", imgSrc: "img/portfolio/treehouse.png", title: "Treehouse", text: "Website Design" },
    //     { href: "#portfolioModal1", imgSrc: "img/portfolio/roundicons.png", title: "Round Icons", text: "Graphic Design" },
    //     { href: "#portfolioModal2", imgSrc: "img/portfolio/startup-framework.png", title: "Startup Framework", text: "Website Design" },
    //     { href: "#portfolioModal3", imgSrc: "img/portfolio/treehouse.png", title: "Treehouse", text: "Website Design" }
    // ];
    // res.json(portfolio);
    portfolioDB.find({},{"_id":0}).then(results=>{
        res.json(results);
    }).catch(err=>{
        console.log(err);
    })
}); 

server.post("/contact",(req,res)=>{
    // var name = req.body.name;
    // var email = req.body.email;
    // var phone = req.body.phone;
    // var message = req.body.message;
    // console.log(`name: ${name}, email: ${email}, phone: ${phone}, message: ${message}`);
    // res.send("Thank you for contacting us!");
    // contactDB.insert(req.body).then(()=>{
    //     res.send("Thank you for contacting us!");
    // });
    contactDB.insert(req.body);
    var upfile =req.files.myFile1;
    upfile.mv(__dirname + "/public/uploads/" + upfile.name,function(err){
        if(err==null){
            res.render("msg",{message:"I got a file " + upfile.name});
        }else{
            res.render("msg",{message:err});
        }
    });
});

server.listen(8080);
