var mysql = require('mysql');
//CONEXION
var conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '360tiempo', 
    database: 'AliBets',
    dateStrings: 'true'
  });
  conexion.connect(function(err){
    if(err) throw err;
  });

module.exports = conexion;