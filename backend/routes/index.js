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


// < 체형 측정 Router >
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);  // 파일 확장자 가져오기
        cb(null, uniqueSuffix + ext);  // 파일 이름에 확장자 추가 (.jpg / .png 와 같은 확장자를 파일 이름 뒤에 추가해준 것)
    }
});
const upload = multer({ storage: storage });


// < 3D Mesh 이미지 업로드 라우트 및 신체 측정 라우트 >

// 1. brew install ngrok/ngrok/ngrok 로 backend 폴더에 설치
// 2. 기존의 터미널 창은 backend 폴더와 frontend 폴더만 열었다면, 터미널 하나를 더 열어준다 ! -> 즉, 터미널 화면을 3개를 띄운다는 점
// 3. ngrok config add-authtoken YOUR_AUTHTOKEN -> YOUR_AUTHTOKEN 부분에 본인의 ngrok 토큰을 작성한다. (우리팀은 준호형 토큰으로)
// 3. 새로 연 터미널 창에서 backend 폴더로 진입 후 터미널 창에 "ngrok http 3007" 을 입력한다.
// 4. Forwarding 옆에 출력된 url 주소를 FastAPI 서버의 main.py 에 복붙을 한다.
router.post('/upload', upload.single('file'), (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, '..', 'image', req.file.originalname);
    fs.rename(tempPath, targetPath, err => {
        if (err) return res.status(500).json({ message: "Failed to save image" });
        res.status(200).json({ message: "Image uploaded successfully", path: targetPath });
    });
});

router.post("/measurement", upload.single("image"), async (req, res) => {
    const { gender, height, weight } = req.body;
    const file = req.file;  // multer 로 업로드된 이미지 경로를 imagePath 변수에 저장

    try {
        console.log("체형 측정 Router 작동 :", gender, height, weight, file.path);
        console.log("req.file : ", file);

        // FastAPI 서버로 전송할 폼 데이터 생성
        const formData = new FormData();
        formData.append("height", height);
        formData.append("weight", weight);
        formData.append('file', fs.createReadStream(file.path), file.originalname);  // 업로드된 이미지를 파일 스트림으로 추가

        // 먼저 서버가 살아있는지 테스트
        // const testResponse = await axios.get('http://localhost:8000');
        // console.log("서버 응답:", testResponse.status);

        // FastAPI 서버에 이미지와 폼 데이터를 POST 요청으로 전송
        const url = "https://9a16-114-110-128-38.ngrok-free.app";  // 수시로 바뀜
        const response = await axios.post(`${url}/predict`, formData, {
            // headers: {
            //     ...formData.getHeaders(), // FormData 의 기본 헤더 설정
            //     "Accept": "application/json"  // JSON 응답을 받기 위한 헤더 설정 -> 명시적으로 JSON 형식의 응답을 요청하는 구문
            //     // 꼭 사용하지 않아도 되지만, 그럴 경우 FastAPI 서버가 JSON 으로 응답하지 않고 다른 형식으로 응답을 한다면 JSON 파싱 오류가 발생할 수 있음.
            // }
            headers: formData.getHeaders(),
            maxBodyLength: Infinity
        });

        console.log("FastAPI서버에서 받은 response data : ", response.data);

        // FastAPI 서버로 전송된 이미지 경로를 React 서버에 전달 
        res.json({ message: "Image processed by FastAPI server", data: response.data });

    } catch (err) {
        console.error("상세 에러 정보:", {
            message: err.message,
            code: err.code,
            url: err.config?.url,
            method: err.config?.method,
            response: err.response?.data
        });
        res.status(500).json({ error: "서버 연결 실패", details: err.message });
    }
});


module.exports = router;