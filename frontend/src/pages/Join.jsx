import React, { useState } from 'react';
import { User, Lock, Calendar } from 'lucide-react';
import instance from '../axios';

const Join = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [userName, setUserName] = useState('');
  const [userGender, setUserGender] = useState('');
  
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  
  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const days = birthYear && birthMonth 
    ? Array.from({ length: getDaysInMonth(birthYear, birthMonth) }, (_, i) => i + 1)
    : Array.from({ length: 31 }, (_, i) => i + 1);

  const sendData = async (e) => {
    e.preventDefault();

    const formattedBirth = birthYear && birthMonth && birthDay
      ? `${birthYear}-${birthMonth.toString().padStart(2, '0')}-${birthDay.toString().padStart(2, '0')}`
      : '';

    try {
      const res = await instance.post("/join", {
        id: id,
        pw: pw,
        name: userName,
        gender: userGender,
        birth: formattedBirth
      });

      if (res.data.result === "success") {
        window.alert("회원가입 성공 !!")
        window.location.href = '/login';
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

          <div className="input-group birth-group">
            {/* <div className="input-icon">
              <Calendar size={20} />
            </div> */}
            <div className="birth-select-group">
              <select
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                className="birth-select"
              >
                <option value="">년도</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}년</option>
                ))}
              </select>
              <select
                value={birthMonth}
                onChange={(e) => setBirthMonth(e.target.value)}
                className="birth-select"
              >
                <option value="">월</option>
                {months.map(month => (
                  <option key={month} value={month}>{month}월</option>
                ))}
              </select>
              <select
                value={birthDay}
                onChange={(e) => setBirthDay(e.target.value)}
                className="birth-select"
              >
                <option value="">일</option>
                {days.map(day => (
                  <option key={day} value={day}>{day}일</option>
                ))}
              </select>
            </div>
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