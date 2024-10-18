import React from 'react'
import { Link } from 'react-router-dom'
import instance from '../axios';

const Home = ({setUser}) => {

    const logout = async () => {
        console.log("로그아웃 함수");
        const res = await instance.get("/logout");
        console.log("logout res :", res.data);

        // sessionStorage 값 지우기
        sessionStorage.removeItem("info");

        setUser("");
        alert("다음에 또 방문해주세요 ~!");
    }

    return (
        <div>
            <Link to="/join">회원가입</Link> <br />
            <Link to="/login">login</Link> 
            <Link to='/measurement'>체형측정</Link>

            <button onClick={logout}>로그아웃</button>
        </div>
    )
}

export default Home