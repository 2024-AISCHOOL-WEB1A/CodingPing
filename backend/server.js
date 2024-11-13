const express = require("express")
const path = require("path")
const cors = require("cors")
const session = require("express-session")
const fileStore = require("session-file-store")(session)

const app = express()
const indexRouter = require("./routes")  // 기본 라우터 (index.js) 불러오기
const measurementRouter = require("./routes/measurement");  // 3D Mesh 이미지를 위한 라우터 불러오기
const fittingRouter = require("./routes/fitting")  // heatmap 효과로 인한 결과물들을 위한 라우터 불러오기

// < 정적인 파일 경로 설정 >
app.use(express.static(path.join(__dirname, "..", "frontend", "build")))  // 프론트엔드 빌드 파일 제공
app.use('/uploads', express.static('upload'))  // 사용자가 본인의 사진을 업로드해서 저장된 "upload" 폴더를 "/uploads" 경로로 설정
app.use("/image", express.static("image"));  // 3D Mesh 이미지가 저장된 'image' 폴더를 "/image" 경로로 설정

// < CORS 오류 처리를 위한 모듈 가져오기 및 JSON 파싱 미들웨어 >
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))  // URL-encoded 데이터 파싱 (확장 기능 비활성화)

// < 세션 설정 >
let fileStoreOptions = {
    path: "./sessions",  // 세션 파일 저장 경로를 "./sessions" 로 설정
    reapInterval: 100  // 세션 정리 주기를 10초로 설정
}

//  - 세션 미들웨어 설정
app.use(session({
    httpOnly: true,  // http 를 통해서만 세션에 접근
    resave: false,  // 세션을 항상 재저장하지 않도록
    secret: "ais",  // 세션 암호화를 위한 비밀 키
    saveUninitialized: false,  // 초기화 되지 않은 세션을 저장하지 않음
    store: new fileStore(fileStoreOptions),  // 파일 스토어를 이용해 세션 저장
    cookie: { maxAge: 3600000 }  // 쿠키의 유효기간 
}))


// < 라우터 설정 >
app.use("/", indexRouter);  // 기본 경로 ("/") 요청을 indexRouter 로 처리
app.use("/measurement", measurementRouter);  // "/measurement" 경로 요청을 measurementRouter 로 처리
app.use("/fitting", fittingRouter)  // "/fitting" 경로 요청을 fittingRouter 로 처리

// < 서버 포트 설정 및 시작 >
app.set("port", process.env.PORT || 3007)
app.listen(app.get("port"), () => {
    console.log(`Server is running on ${app.get("port")}`);
})