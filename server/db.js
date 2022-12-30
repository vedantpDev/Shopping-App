const mysql = require("mysql2");
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "shopping",
});

conn.connect;

module.exports = conn;
