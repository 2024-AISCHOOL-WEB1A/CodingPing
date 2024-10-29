import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import instance from './axios';
import $ from 'jquery';
import Join from './pages/Join';
import Home from './pages/Home';
import Login from './pages/Login';
import Measurement from './pages/Measurement';

function App() {
  const location = useLocation();
  const [isHome, setIsHome] = useState(location.pathname === '/');
  const [user, setUser] = useState();
  const [sInfo, setSInfo] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  // 현재 session 값을 확인할 수 있는 함수
  const getSession = async () => {
    const res = await instance.get("/getSession")
  }

  useEffect(() => {
    getSession();
    console.log("session안에 값", JSON.parse(sessionStorage.getItem("info")));
    setSInfo(JSON.parse(sessionStorage.getItem("info")))
  }, [user]);

  // 라우트 변경 감지
  useEffect(() => {
    setIsHome(location.pathname === '/');
  }, [location]);

  // work.js 초기화 (Home 페이지일 때만)
  useEffect(() => {
    // Home 페이지가 아니면 work.js를 로드하지 않음
    if (!isHome) return;

    // jQuery를 전역 객체(window)에 할당
    window.jQuery = window.$ = $;

    // work.js를 로드하고 초기화 하는 함수
    const initializeWorkJs = () => {
      const script = document.createElement('script');
      script.src = `${process.env.PUBLIC_URL}/work.js`;
      script.async = true;
      
      // 스크립트 완료시 실행되는 함수 
      script.onload = () => {
        setTimeout(() => {
          if (window.app && typeof window.app.init === 'function') {
            try {
              window.app.init();
            } catch (error) {
              console.error('work.js 초기화 중 에러:', error);
            }
          }
          setIsLoaded(true);
        }, 100);
      };

      // 스크립트 로드 중 에러 발생 시 처리
      script.onerror = (error) => {
        console.error('work.js 로드 중 에러:', error);
      };

      // body에 스크립트 태그 추가
      document.body.appendChild(script);
    };

    initializeWorkJs();

    // 클린업 함수
    return () => {
      const script = document.querySelector(`script[src*="work.js"]`);
      if (script) {
        script.remove();
      }
      // work.js에 의해 추가된 이벤트 리스너나 다른 리소스들을 정리
      if (window.app && typeof window.app.cleanup === 'function') {
        window.app.cleanup();
      }
    };
  }, [isHome]); // isHome이 변경될 때만 이 효과를 재실행

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home setUser={setUser} />} />
        <Route path='/join' element={<Join />} />
        <Route path='/login' element={<Login setUser={setUser} />} />
        <Route path='/measurement' element={<Measurement />} />
      </Routes>
    </div>
  );
}

export default App;