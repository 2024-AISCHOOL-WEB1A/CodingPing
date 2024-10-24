import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import instance from './axios';
import $ from 'jquery';  // jQuery import 추가 설치도 필요함 npm i jquery
import Join from './pages/Join';
import Home from './pages/Home';
import Login from './pages/Login';
import Measurement from './pages/Measurement';

function App() {

  const [user, setUser] = useState();
  const [sInfo, setSInfo] = useState();  // 세션에 저장되어 있는 값을 저장하기 위해 만든 state
  const [isLoaded, setIsLoaded] = useState(false)

  // 현재 session 값을 확인할 수 있는 함수 시작 부분
  const getSession = async () => {
    const res = await instance.get("/getSession")
    // console.log("getSession res :", res);
  }

  useEffect(() => {
    getSession();
    console.log("session안에 값", JSON.parse(sessionStorage.getItem("info")));
    setSInfo(JSON.parse(sessionStorage.getItem("info")))
  }, [user]);
  // 끝 부분

  // 외부 스크립트 로드 시작 부분
  useEffect(() => {
    // jQuery를 전역 객체(window)에 할당
    window.jQuery = window.$ = $;

    // work.js 로드
    const initializeWorkJs = () => {

      // 새로운 script 태그 생성
      const script = document.createElement('script');
      // script 소스 설정
      script.src = `${process.env.PUBLIC_URL}/work.js`;
      // 비동기 로드 설정
      script.async = true;

      // 스크립트 로드 완료 시 실행될 함수
      script.onload = () => {
        // 약간의 지연 후 초기화 (DOM이 완전히 준비되도록)
        setTimeout(() => {
          // window.app.init 함수가 있다면 실행
          if (window.app && typeof window.app.init === 'function') {
            window.app.init();
          }
          // 로드 완료 상태로 변경
          setIsLoaded(true);
        }, 100);
      };
      // body에 script 태그 추가
      document.body.appendChild(script);
    };

    initializeWorkJs();

    // 컴포넌트 언마운트 시 정리 함수 실행
    return () => {
      const script = document.querySelector(`script[src*="work.js"]`);
      if (script) {
        script.remove();
      }
    };
  }, []);
  // 끝 부분

  return (
    <div className="App ">
      <Routes>
        <Route path='/' element={<Home setUser={setUser} />}></Route>
        <Route path='/join' element={<Join />}></Route>
        <Route path='/login' element={<Login setUser={setUser} />}></Route>
        <Route path='measurement' element={<Measurement/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
