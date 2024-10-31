import React, { useState } from 'react';
import instance from '../axios';
import { User, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const Login = ({ setUser }) => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

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
    // nav("/") 대신 window.location.href 사용 로그인 성공 후 메인페이지 이동시 동적효과 작동을 위하여
    window.location.href = '/';
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2>로그인</h2>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <div className="input-icon">
              <User size={20} />
            </div>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="아이디"
            />
          </div>

          <div className="input-group">
            <div className="input-icon">
              <Lock size={20} />
            </div>
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="비밀번호"
            />
          </div>

          <button type="submit" className="submit-button">
            로그인
          </button>

          <div className="login-links">
            <Link to='/join'>회원가입</Link>
          </div>

          <div className="social-login">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                console.log('Login Failed');
                window.alert("Google 로그인 실패");
              }}
              theme="outline"
              size="large"
              width="100%"
              text="continue_with"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;