const mysql = require("mysql2")

const conn = mysql.createConnection({
    // host: process.env.DB_HOST,
    // port : process.env.DB_PORT,
    // database: process.env.DB_DATABASE,
    // password: process.env.DB_PASSWORD,
    // user: process.env.DB_USER

    host: "project-db-stu3.smhrd.com",
    port: "3307",
    database: "Insa5_JSA_final_3",
    password: "aischool3",
    user: "Insa5_JSA_final_3"
});


conn.connect((err) => {
    if (err) { console.log(err) }
    else { console.log("DB와 연동 완료 !");}
})

module.exports = conn;