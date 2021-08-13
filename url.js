var express  = require('express')
var conn = require("./lib/database");
var router = express.Router()
var multer = require("multer")
var Path = require("path")
//image uploading setup
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/photos")
    },
    filename: function(req,file,cb){
        cb(null,file.fieldname + "_" + Date.now() + Path.extname(file.originalname))
    }
})   

var upload = multer({storage:storage})


//all route here
router.get("/",function(req,res){
    data = {}
    query = conn.query("select * from topics; select * from posts",(err,result)=>{
        res.render("home",{topics:result[0],posts:result[1]})
    })

})

router.get("/insert",(req,res)=>{
    conn.query("select * from topics",(err,result) => {
        return res.render("insert",{topics: result});
    })
})

router.post("/insert",upload.single("image"),(req,res)=>{
    sql = "insert into posts (p_title, topic_id, author, content, image, status) value (?,?,?,?,?,?)";
    conn.query(sql,[req.body.p_title,req.body.topic_id,req.body.author,req.body.content,req.file.filename,1],(err,result) => {
        if(err) throw err;
    })
})



module.exports = router
