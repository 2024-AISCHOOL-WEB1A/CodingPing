const express = require('express');
const router = express.Router();
const path = require("path");
const conn = require("../config/database");
const cryptoJs = require("crypto-js");  // SHA-256 암호화, npm install crypto-js

const { OAuth2Client } = require('google-auth-library');
// Google 인증 클라이언트 설정
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const multer = require("multer");  // 파일 업로드를 위한 multer 모듈 불러옴  // npm i multer
const axios = require("axios");  // HTTP 요청을 위한 axios 모듈 불러옴  // npm i axios 
const fs = require("fs");  // 파일 시스템을 다루기 위한 fs 모듈 불러옴
const schedule = require("node-schedule");

const FormData = require('form-data');  // npm install form-data


router.get('/', (req, res) => {
    console.log('Main Router');
    res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'build', 'index.html'))
});


// < 회원가입 Router > 
router.post("/join", (req, res) => {

    console.log("join router : ", req.body);
    let { id, pw, name, gender, birth } = req.body;
    pw = cryptoJs.SHA256(pw).toString();  // toString() 으로 문자열 형태로 저장할 수 있게 만들어줌 // toString() 안 쓰면 저장 안 됨.
    console.log("암호화된 pw : ", pw);

    if (gender === "male") {
        gender = "M";
    } else {
        gender = "F";
    }

    // user_tb 테이블에 회원가입 정보 저장
    const sql = "INSERT INTO user_tb (user_id, user_pw, user_name, user_gender, user_birthdate) VALUES (?, ?, ?, ?, ?)";
    conn.query(sql, [id, pw, name, gender, birth], (err, rows) => {
        if (err) {
            console.log("데이터 삽입 실패 .. : ", err);
            res.json({ result: "failed" });
        } else {
            console.log("데이터 삽입 성공 !!", rows);
            res.json({ result: "success" });
        }
    });
});


// < 로그인 Router >
router.post("/login", (req, res) => {
    console.log("login router : ", req.body);
    let { id, pw } = req.body;
    pw = cryptoJs.SHA256(pw).toString();
    console.log(pw);

    let sql = "SELECT user_id, user_pw FROM user_tb WHERE user_id = ? AND user_pw = ?";
    conn.query(sql, [id, pw], (err, rows) => {
        if (rows.length > 0) {
            req.session.userId = id;
            console.log("로그인 성공 !", rows);
            res.json({ result: "success", id: id });
        } else {
            console.log("로그인 실패", err);
            res.json({ result: "failed" });
        }
    });
});

// Google 로그인 처리 라우트
router.post('/api/auth/google', async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        console.log(payload);
        const userEmail = payload.email;
        const pw = cryptoJs.SHA256("GOOGLE_AUTH").toString();  // 구글 로그인 사용자는 비밀번호를 따로 입력해주지 않기 때문에 "GOOGLE_AUTH" 로 일단 통일

        let sql = "SELECT * FROM user_tb WHERE user_id = ?";
        conn.query(sql, [userEmail], (err, rows) => {

            console.log("google rows : ", rows);

            if (err) {
                console.log("데이터베이스 조회 오류 : ", err);
                res.json({ success: false });
            }

            if (rows.length === 0) {  // DB 에 구글 이메일이 user_id 로 저장되어 있지 않을 때
                sql = 'INSERT INTO user_tb (user_id, user_pw, user_name, user_gender, user_birthdate) VALUES (?, ?, ?, "", "2000-01-01")';
                conn.query(sql, [userEmail, pw, payload.name], (err, rows) => {
                    if (err) {
                        console.log("구글 아이디 데이터 삽입 실패 : ", err);
                        return res.status(500).json({ success: false });
                    } else {
                        req.session.userId = userEmail;
                        res.json({ success: true, user: payload });
                    }
                });
            } else {  // DB 에 구글 이메일이 user_id 로 저장이 되어 있을 때
                req.session.userId = userEmail;
                res.json({ success: true, user: payload });
            }
        });
    } catch (error) {
        res.status(400).json({ success: false });
    }
});


// < 로그아웃 Router >
router.get("/logout", (req, res) => {
    console.log("logout router");
    req.session.destroy(err => {
        if (err) {
            console.error("세션 삭제 중 오류 발생:", err);
            return res.status(500).json({ result: "failed" });
        }
        res.json({ result: "success" });
    });
});
router.get("/getSession", (req, res) => {
    console.log("getSession router", req.session.userId);
    res.json({ id: req.session.userId });
});



// 서버 시작 시 실행될 함수
function cleanupOldFiles() {
    const uploadDir = path.join(__dirname, '../upload');
    const oneHourAgo = Date.now() - (60 * 60 * 1000);  // 1시간 전 시간

    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            console.error('폴더 읽기 실패:', err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(uploadDir, file);
            
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('파일 정보 읽기 실패:', err);
                    return;
                }

                if (stats.ctimeMs < oneHourAgo) {  // 파일이 1시간보다 오래되었으면 삭제
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error(`파일 삭제 실패: ${file}`, err);
                        } else {
                            console.log(`오래된 파일 삭제 완료: ${file}`);
                        }
                    });
                }
            });
        });
    });
}

// 서버 시작 시 실행
cleanupOldFiles();

// 주기적으로 정리 (옵션)
// 매 시간마다 정리
schedule.scheduleJob('0 * * * *', cleanupOldFiles);


module.exports = router;