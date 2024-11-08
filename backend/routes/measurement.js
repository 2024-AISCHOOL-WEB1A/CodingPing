/** [ 사용자가 본인의 신체 측정을 할 때 작동되는 js 코드 ] 
        1. 사용자가 본인의 사진을 Mesurement.jsx 에서 업로드 했을 때 multer 방식을 이용해서 upload 폴더에 사용자의 이미지가 저장됨.
        2. router.post("/measurement") 구문을 통해 FastAPI 서버로 사용자의 이미지가 전달 됨.
        3. FastAPI 서버에 전달된 사용자의 이미지가 모델링 후 결과 이미지가 react 서버로 넘어와서 image 폴더에 저장됨.
*/ 


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


// ** 파일 삭제 스케줄링 함수 정의 **
// 사용자가 Measurement.jsx 에서 업로드한 이미지를 일정 시간 (1시간) 후에 upload 폴더에서 자동으로 삭제하기 위한 함수
const scheduleFileDelete = (filename) => {  
    const filePath = path.join(__dirname, "..", "/upload", filename);

    // 1시간 후 삭제 예약
    const deleteTime = new Date(Date.now() + 60 * 60 * 1000);
    
    schedule.scheduleJob(deleteTime, function() {
        fs.unlink(filePath, (err) => {  // 지정된 시간이 되면 파일 삭제
            if (err) {
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
// ** POST / 측정 요청 라우트 **
// 사용자가 업로드한 이미지와 신체 정보를 FastAPI 서버로 전송하는 요청 처리
router.post("/", upload.single("image"), async (req, res) => {
    const { gender, height, weight } = req.body;
    const file = req.file;  // multer로 업로드된 이미지 파일 정보

    try {
        console.log("체형 측정 Router 작동 :", gender, height, weight, file.path);

        // FastAPI 서버로 전송할 폼 데이터 생성
        const formData = new FormData();
        formData.append("height", height);
        formData.append("weight", weight);
        formData.append('file', fs.createReadStream(file.path), file.originalname);  // 업로드된 이미지를 파일 스트림으로 추가

        // FastAPI 서버 URL (ngrok URL 이므로 수시로 바뀔 수 있음)
        const url = "https://439f-114-110-128-38.ngrok-free.app";
        const response = await axios.post(`${url}/predict`, formData, {
            headers: formData.getHeaders(),
            maxBodyLength: Infinity  // Body 길이 무제한 설정 (대용량 데이터 전송을 위한 설정)
        });

        console.log("FastAPI서버에서 받은 response data : ", response.data); 
        res.json({ message: "Image processed by FastAPI server", data: response.data });  // FastAPI 서버로 전송된 이미지 경로를 React 서버에 전달

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


// ** POST /meshImageSave 요청 라우트 **
// FastAPI 서버에서 모델링을 통해 나온 결과 이미지를 image 폴더에 저장
router.post('/meshImageSave', upload.single('file'), (req, res) => {
    const tempPath = req.file.path;  // 임시 업로드 경로
    const targetPath = path.join(__dirname, '..', 'image', req.file.originalname);  // 최종 저장 경로

    // 임시 경로의 파일을 최종 경로로 이동 (rename 함수로 경로 변경)
    fs.rename(tempPath, targetPath, err => {
        if (err) return res.status(500).json({ message: "Failed to save image" });
        res.status(200).json({ message: "Image uploaded successfully", path: targetPath });
    });
});



module.exports = router;