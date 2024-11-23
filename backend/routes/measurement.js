const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");  // 파일 시스템을 다루기 위한 fs 모듈 불러옴
const axios = require("axios");  // HTTP 요청을 위한 axios 모듈 불러옴  // npm i axios 
const multer = require("multer");  // 파일 업로드를 위한 multer 모듈 불러옴  // npm i multer
const schedule = require("node-schedule");  // 스케줄링을 위해 node-schedule 모듈 불러옴  // npm i node-schedule
const FormData = require('form-data');  // npm install form-data
const conn = require("../config/database");



/** multer 스토리지 설정 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/');  // 파일을 "upload/" 폴더에 저장
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);  // 고유한 파일명 생성
        const ext = path.extname(file.originalname);  // 파일 확장자 가져오기

        cb(null, uniqueSuffix + ext);  // 파일 이름에 확장자 추가 (.jpg / .png 와 같은 확장자를 파일 이름 뒤에 추가해준 것)
        scheduleFileDelete(uniqueSuffix + ext);  // 파일이 저장될 때 삭제 예약
    }
});
const upload = multer({ storage: storage });


/** 파일 삭제 스케줄링 함수
 * 사용자가 Measurement.jsx 에서 업로드한 이미지를 일정 시간 (1시간) 후에 upload 폴더에서 자동으로 삭제하기 위한 함수
 * @param {string} filename - 삭제할 파일명
 */
const scheduleFileDelete = (filename) => {
    const filePath = path.join(__dirname, "..", "/upload", filename);

    // 1시간 후 삭제 예약
    const deleteTime = new Date(Date.now() + 60 * 60 * 1000);

    schedule.scheduleJob(deleteTime, function () {
        fs.unlink(filePath, (err) => {
            if (err && err.code !== 'ENOENT') {  // ENOENT: 파일이 존재하지 않음
                console.error(`파일 삭제 실패: ${filename}`, err);
            } else {
                console.log(`파일 삭제 완료: ${filename}`);
            }
        });        
    });
}


/** 🚨 이거 안 읽고 실행하면 신체측정 안 됩니다 !
    1. ngrok 을 backend 폴더에 설치
        - Window : npm install -g ngrok
        - Mac : brew install ngrok/ngrok/ngrok
    
    2. 기존의 터미널 창은 backend 폴더와 frontend 폴더만 열었다면, 터미널 하나를 더 열어준다 ! -> 즉, 터미널 화면을 3개를 띄운다는 점
    3. ngrok config add-authtoken YOUR_AUTHTOKEN -> YOUR_AUTHTOKEN 부분에 본인의 ngrok 토큰을 작성한다. (우리팀은 준호형 토큰으로)
    4. 새로 연 터미널 창에서 backend 폴더로 진입 후 터미널 창에 "ngrok http 3007" 을 입력한다.
    5. Forwarding 옆에 출력된 url 주소를 FastAPI 서버의 main.py 에 복붙을 한다.
*/
/** < 신체 측정 라우트 >
 * 이미지를 FastAPI 서버로 전송하고 FastAPI 서버에서 모델 실행을 통해 측정된 데이터를 데이터베이스에 저장
 */
router.post("/", upload.single("image"), async (req, res) => {
    const { userId, gender, height, weight } = req.body;
    const file = req.file;  // multer로 업로드된 이미지 파일 정보

    try {
        console.log("체형 측정 Router 작동 :", userId, gender, height, weight, file.path);
        console.log("userId", userId);

        // FastAPI 서버로 전송할 폼 데이터 생성
        const formData = new FormData();
        formData.append("height", height);
        formData.append("weight", weight);
        
        // 파일을 스트림 방식으로 추가
        const stream = fs.createReadStream(file.path);
        stream.on('error', (err) => console.error("스트림 에러:", err));
        formData.append('file', stream, file.originalname);  // 스트림으로 파일 추가

        // FastAPI 서버 URL (ngrok URL 이므로 수시로 바뀔 수 있음)
        const url = "https://1fa0-114-110-128-38.ngrok-free.app";
        const response = await axios.post(`${url}/api/predict`, formData, {
            headers: formData.getHeaders(),
            maxBodyLength: Infinity,  // Body 길이 무제한 설정 (대용량 데이터 전송을 위한 설정)
        });

        // console.log("FastAPI서버에서 받은 response data : ", response.data);

        // 모델링을 통해서 나온 사용자의 신체 정보를 DB 에 저장
        const sql = `INSERT INTO body_measurement
                        (
                            user_id, gender, height, weight, 
                            arm_length, forearm_length, upper_length, thigh_length, leg_length,
                            shoulder_width, waist_width, chest_width, hip_width, thigh_width, 
                            chest_circ, hip_circ, waist_circ, image
                        )
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        conn.query(sql, [
            userId, gender, height, weight,
            response.data.measurements.arm_length,  // 팔 길이
            response.data.measurements.forearm_length,  // 팔뚝 길이
            response.data.measurements.upper_length,  // 상체 길이
            response.data.measurements.thigh_length,  // 허벅지 길이
            response.data.measurements.leg_length,  // 다리 길이
            response.data.measurements.shoulder_width,  // 어깨 너비
            response.data.measurements.waist_width,  // 허리 너비
            response.data.measurements.chest_width,  // 가슴 단면
            response.data.measurements.hip_width,  // 엉덩이 단면
            response.data.measurements.thigh_width,  // 허벅지 단면
            response.data.measurements.chest_circ,  // 가슴 둘레
            response.data.measurements.hip_circ,  // 엉덩이 둘레
            response.data.measurements.waist_circ,  // 허리 둘레
            response.data.image_path,  // image 폴더에 저장된 사용자의 3D Mesh 이미지파일 이름
        ], (err, rows) => {
            if (err) {  // 모델링 된 결과를 DB 에 저장 실패했을 시 에러 처리
                console.log("데이터베이스 저장 실패 : ", err);
                return res.status(500).json({ error: "데이터베이스 오류" });
            } else {  // DB 에 저장 성공 시 클라이언트에 성공 응답 전송
                console.log("신체치수 측정 데이터 데이터베이스 저장 성공 !!");
                res.json({ message: "FastAPI 서버에서 이미지 처리 완료", data: response.data });  // FastAPI 서버로 전송된 이미지 경로를 React 서버에 전달
            }
        });
    } catch (err) {
        console.error("상세 에러 정보:", {
            message: err.message,
            code: err.code,
            response: err.response?.data
        });
        res.status(500).json({ error: "서버 연결 실패", details: err.message });
    }
});


/** < 마이페이지에서 사용자의 신체 측정 정보를 조회하는 라우트 >
 * 사용자가 가장 최근에 신체 치수 측정한 3개의 정보를 불러옴
 */
router.get("/mypage", async (req, res) => {
    try {
        const userId = req.query.user_id;

        if (!userId) {
            return res.status(400).json({ error: "userId가 필요합니다." });
        }

        // 최근 3개의 신체 측정 데이터를 가져오는 SQL 쿼리
        const sql = `
                        SELECT height, weight, arm_length, forearm_length, upper_length, leg_length,
                               shoulder_width, waist_width, chest_width, hip_width, thigh_width, image, measurement_date
                        FROM body_measurement
                        WHERE user_id = ?
                        ORDER BY measurement_date DESC
                        LIMIT 3
                    `;
        conn.query(sql, [userId], (err, rows) => {
            if (err || rows.length === 0) {
                console.log("데이터베이스에서 값 불러오기 실패 : ", err);
            } else {
                console.log("데이터베이스에서 값 가져오기 성공 !");
                res.json({ measurements: rows });
            }
        });
    } catch (err) {
        console.error("데이터 가져오기 오류 :", err);
        res.status(500).json({ error: "데이터를 가져오는 중 오류가 발생했습니다." });
    }
});



module.exports = router;