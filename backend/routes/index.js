const express = require('express');
const router = express.Router();
const path = require("path");
const conn = require("../config/database");
const cryptoJs = require("crypto-js");  // SHA-256 암호화, npm install crypto-js


router.get('/', (req, res) => {
    console.log('Main Router');
    res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'build', 'index.html'))
});


// < 회원가입 Router > 
router.post("/join", (req, res) => {

    console.log("join router : ", req.body);
    let { id, pw, name, gender, birth } = req.body;
    pw = cryptoJs.SHA256("pw").toString();  // toString() 으로 문자열 형태로 저장할 수 있게 만들어줌
    console.log("암호화된 pw : ", pw);
    
    // user_tb 테이블에 회원가입 정보 저장
    const sql = "INSERT INTO user_tb (user_id, user_pw, user_name, user_gender, user_birthdate) VALUES (?, ?, ?, ?, ?)";
    conn.query(sql, [id, pw, name, gender, birth], (err, rows) => {
        if(err) {
            console.log("데이터 삽입 실패 ..");
            res.json({result: "failed"});
        } else {
            console.log("데이터 삽입 성공 !!", rows);
            res.json({result: "success"});
        }
    });
});


// < 로그인 Router >
router.post("/login", (req, res) => {
    console.log("login router : ", req.body);
    let { id, pw } = req.body;
    pw = cryptoJs.SHA256("pw").toString();

    let sql = "SELECT user_id, user_pw FROM user_tb WHERE user_id = ? AND user_pw = ?";
    conn.query(sql, [id, pw], (err, rows) => {
        console.log("로그인 rows: ",rows);
        
        if (rows.length > 0) {
            req.session.userId = id;
            console.log("로그인 성공 !", rows);
            res.json({result: "success", id: id});
        } else {
            console.log("로그인 실패", err);
            res.json({result: "failed"});
        }
    });
});


// < 로그아웃 Router >
router.get("/logout", (req, res) => {
    console.log("logout router");
    req.session.destroy((err) => {
        if (err) {
            console.log("세션 삭제 중 오류 발생:", err);
        }
        console.log("로그아웃 완료", req.session);
        res.json({ id: req.session });
    });
});



module.exports = router;