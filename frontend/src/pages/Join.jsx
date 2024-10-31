import React, { useState } from 'react';
import { User, Lock, Mail, Calendar, ChevronDown } from 'lucide-react'; // npm install lucide-react
import instance from '../axios';

const Join = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [repw, setRepw] = useState('');
  const [userName, setUserName] = useState('');
  const [userGender, setUserGender] = useState('');
  const [userBirth, setUserBirth] = useState('');

  const sendData = async (e) => {
    e.preventDefault();

    try {
      const res = await instance.post("/join", {
        id: id,
        pw: pw,
        name: userName,
        gender: userGender,
        birth: userBirth
      });

      if (res.data.result === "success") {
        window.alert("회원가입 성공 !!")
        // nav("/") 대신 window.location.href 사용 로그인 성공 후 메인페이지 이동시 동적효과 작동을 위하여
        window.location.href = '/';
      } else {
        window.alert("회원 가입에 실패하셨습니다. 다시 한 번 시도해주세요.");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="join-container">
      <div className="join-box">
        <div className="join-header">
          <h2>회원가입</h2>
        </div>

        <form onSubmit={sendData} className="join-form">
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

          <div className="input-group">
            <div className="input-icon">
              <User size={20} />
            </div>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="이름"
            />
          </div>

          <div className="input-group">
            <div className="input-icon">
              <Calendar size={20} />
            </div>
            <input
              type="date"
              value={userBirth}
              onChange={(e) => setUserBirth(e.target.value)}
            />
          </div>

          <div className="gender-group">
            <button
              type="button"
              className={`gender-button ${userGender === 'male' ? 'active' : ''}`}
              onClick={() => setUserGender('male')}
            >
              남성
            </button>
            <button
              type="button"
              className={`gender-button ${userGender === 'female' ? 'active' : ''}`}
              onClick={() => setUserGender('female')}
            >
              여성
            </button>
          </div>

          <button type="submit" className="submit-button">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}

export default Join;