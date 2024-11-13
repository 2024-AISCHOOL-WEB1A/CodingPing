const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");  // 파일 시스템을 다루기 위한 fs 모듈 불러옴
const axios = require("axios");  // HTTP 요청을 위한 axios 모듈 불러옴  // npm i axios 
const multer = require("multer");  // 파일 업로드를 위한 multer 모듈 불러옴  // npm i multer
const schedule = require("node-schedule");  // 스케줄링을 위해 node-schedule 모듈 불러옴  // npm i node-schedule
const conn = require("../config/database");


router.post("/clothes", async (req, res) => {
    const userId = req.body.userId;
    const clothesSizes = req.body.clothesSizes;
    let clothesType = "";
    if (req.body.clothesType === "반팔") { clothesType = "shortSleeve"; }
    else if (req.body.clothesType === "긴팔") { clothesType = "longSleeve"; }
    else if (req.body.clothesType === "긴바지") { clothesType = "shortPants"; }
    else { clothesType = "longPants"; }

    try {
        const sql = `
            SELECT 
                height, weight, chest_circ, waist_circ, hip_circ,
                arm_length, forearm_length, upper_body_length, thigh_length, leg_length,
                shoulder_width, waist_width, chest_width, image
            FROM body_measurement
            WHERE user_id = ?
            ORDER BY measurement_date DESC
            LIMIT 1
        `;

        // Promise 는 비동기 작업이 성공하거나 실패했을 때 그 결과를 반환하기 위해 사용
        const result = await new Promise((resolve, reject) => {  // 실행이 완료되면 resolve 를 반환, 실패하면 reject 를 반환
            conn.query(sql, [userId], (err, rows) => {
                if (err) {
                    console.log("DB 에서 값 불러오기 실패 .. : ", err);
                    reject(err);  // 여기서 Promise 를 reject 하여 catch 블록으로 이동하게 만듬
                } else {
                    console.log("DB 에서 값 가져오기 성공 !");
                    resolve(rows[0]);  // rows[0] 값들을 resolve 를 이용해서 result 변수에 할당
                }
            });
        });

        console.log("DB 에서 가져온 값들 : ", result);
        if (result && result.length > 0) {
            // FastAPI 서버 URL 
            const url = "";
            const response = await axios.post(`${url}/fitting`, {clothesType, clothesSizes, result}, {
                headers: getHeaders(),
                maxBodyLength: Infinity  // Body 길이 무제한 설정 (대용량 데이터 전송을 위한 설정)
            });
            console.log("FastAPI 에서 가져온 결과 값들 : ", response.data);
        }

    } catch (err) {
        console.error("데이터 가져오기 오류 : ", err);
    }
});




module.exports = router;