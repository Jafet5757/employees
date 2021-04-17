const mysql = require('mysql');

//parametros de conexion
const mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root2',
    password:'root2',
    database:'employees'
});

//Iniciamos conexion
mysqlConnection.connect((err) =>{
    if (err) {
        console.log("BD: conexión fallida: " + err);
    } else {
        console.log("BD: conexión exitosa");
    }
});

module.exports = mysqlConnection;