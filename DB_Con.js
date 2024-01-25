const mysql = require('mysql')

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Suman@2003',
    database:'HH_Dev_DB',
    multipleStatements: true
});

connection.connect(function(err){
    if(err) throw err;
   
})

module.exports = connection;