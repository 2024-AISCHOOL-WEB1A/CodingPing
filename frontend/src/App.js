import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import instance from './axios';
import $ from 'jquery';
import Join from './pages/Join';
import Home from './pages/Home';
import Login from './pages/Login';
import Measurement from './pages/Measurement';
import Header from './components/Header';

function App() {
  const location = useLocation();
  const [isHome, setIsHome] = useState(location.pathname === '/');
  const [user, setUser] = useState("");
  const [sInfo, setSInfo] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const getSession = async () => {
    const res = await instance.get("/getSession");
  }

  useEffect(() => {
    getSession();
    console.log("session안에 값", JSON.parse(sessionStorage.getItem("info")));
    setSInfo(JSON.parse(sessionStorage.getItem("info")));
  }, [user]);

  useEffect(() => {
    setIsHome(location.pathname === '/');
  }, [location]);

  useEffect(() => {
    if (!isHome) return;

    window.jQuery = window.$ = $;

    const initializeWorkJs = () => {
      const script = document.createElement('script');
      script.src = `${process.env.PUBLIC_URL}/work.js`;
      script.async = true;
      
      script.onload = () => {
        // DOM이 완전히 로드된 후에 초기화하도록 수정
        if (document.readyState === 'complete') {
          initApp();
        } else {
          window.addEventListener('load', initApp);
        }
      };

      script.onerror = (error) => {
        console.error('work.js 로드 중 에러:', error);
      };

      document.body.appendChild(script);
    };

    const initApp = () => {
      setTimeout(() => {
        try {
          if (window.app && typeof window.app.init === 'function') {
            // 스크롤바 초기화 전에 DOM 요소 존재 여부 확인
            const content = document.querySelector('#content'); // 실제 컨텐츠 요소의 선택자로 변경해주세요
            if (content) {
              window.app.init();
            } else {
              console.warn('Content element not found, deferring initialization');
            }
          }
          setIsLoaded(true);
        } catch (error) {
          console.error('work.js 초기화 중 에러:', error);
        }
      }, 100);
    };

    initializeWorkJs();

    return () => {
      const script = document.querySelector(`script[src*="work.js"]`);
      if (script) {
        script.remove();
      }
      window.removeEventListener('load', initApp);
      if (window.app && typeof window.app.cleanup === 'function') {
        window.app.cleanup();
      }
    };
  }, [isHome]);

  return (
    <div className="App">
      <Header user={user} setUser={setUser}/>
      <div id="content"> {/* 스크롤바를 적용할 컨테이너 추가 */}
        <Routes>
          <Route path='/' element={<Home setUser={setUser} />} />
          <Route path='/join' element={<Join />} />
          <Route path='/login' element={<Login setUser={setUser} />} />
          <Route path='/measurement' element={<Measurement />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;