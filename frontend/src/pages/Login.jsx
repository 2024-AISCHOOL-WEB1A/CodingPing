import React, { useState } from 'react';
import instance from '../axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode"; // 수정된 부분

const Login = ({ setUser }) => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const nav = useNavigate();
    
    /** 사용자가 일반적인 로그인을 선택했을 때 작동하는 함수 */
    const handleLogin = async (e) => {  
        e.preventDefault();
        try {
            const res = await instance.post("/login", { id: id, pw: pw });
            if (res.data.result === "success") {
                loginSuccess(res.data.id);
            } else {
                window.alert("로그인 실패");
            }
        } catch (err) {
            console.log("로그인 중 오류 발생 : ", err);
            window.alert("로그인 중 오류가 발생했습니다 !");
        }
    }

    /** 사용자가 구글 로그인을 선택했을 때 작동하는 함수 */
    const handleGoogleLogin = async (credentialResponse) => {
        console.log("handleGoogleLogin", credentialResponse);
        const decoded = jwtDecode(credentialResponse.credential);
        try {
            const res = await instance.post("/api/auth/google", {
                token: credentialResponse.credential
            });
            if (res.data.success) {
                loginSuccess(res.data.user.email);
            } else {
                window.alert("Google 로그인 실패");
            }
        } catch (err) {
            console.log("Google 로그인 중 오류 발생 : ", err);
            window.alert("Google 로그인 중 오류가 발생했습니다 !");
        }
    }

    const loginSuccess = (userId) => {
        setUser(userId);
        let obj = {
            auth: "user",
            user_id: userId
        }
        sessionStorage.setItem("info", JSON.stringify(obj));
        alert("환영합니다 !!");
        nav("/");
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                ID : <input type="text" onChange={(e) => { setId(e.target.value) }}></input><br />
                PW : <input type="password" onChange={(e) => { setPw(e.target.value) }}></input><br />
                <input type="submit" value="로그인"></input>
            </form>
            <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                    console.log('Login Failed');
                    window.alert("Google 로그인 실패");
                }}
            />
        </div>
    )
}

export default Login;
