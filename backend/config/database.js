const mysql = require("mysql2")

require("dotenv").config()
const conn = mysql.createConnection({
    host: process.env.REACT_APP_DB_HOST,
    port : process.env.REACT_APP_DB_PORT,
    database: process.env.REACT_APP_DB_DATABASE,
    password: process.env.REACT_APP_DB_PASSWORD,
    user: process.env.REACT_APP_DB_USER
});


conn.connect((err) => {
    if (err) { console.log(err) }
    else { console.log("DB와 연동 완료 !");}
})

module.exports = conn;