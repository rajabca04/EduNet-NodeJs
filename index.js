var express  = require('express')
var app = express()
var session = require("express-session")
var multer = require("multer")
var upload = multer()

var flash = require("express-flash")
var cookie = require("cookie-parser")
var route = require("./url.js");

//static directories
app.use(express.static("public"));
app.use(express.static("photos"));



//route config
app.use("/",route);

//view engine
app.set("views","./views");
app.set("view engine","pug")


//json parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//session and cookie
app.use(flash())
app.use(cookie())

//form-multipart form data
app.use(upload.array());

app.listen(3000,function(){
    console.log("your project runing on http://127.0.0.1:3000")
})