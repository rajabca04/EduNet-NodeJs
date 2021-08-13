var mysql = require("mysql")

var conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"edunet",
    multipleStatements:true
})

conn.connect(function(err){
    if(err) throw err
})

module.exports = conn;