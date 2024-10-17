import axios from "axios"

const instance = axios.create({
    baseURL: "http://localhost:3007",
    // 현재 사용하는 서버 주소 입력 -> 배포 시 변경
    headers: { "Content-Type": "application/json" }
})

export default instance;