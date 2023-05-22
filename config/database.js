const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'ecommerce' 
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

module.exports = connection;