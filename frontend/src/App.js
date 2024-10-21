import { Route, Routes } from 'react-router-dom';
import './App.css';
import instance from './axios';
import Join from './pages/Join';
import Home from './pages/Home';
import Login from './pages/Login';
import Measurement from './pages/Measurement';
import { useEffect, useState } from 'react';

function App() {

  const [user, setUser] = useState();
  const [sInfo, setSInfo] = useState();  // 세션에 저장되어 있는 값을 저장하기 위해 만든 state

  /** 현재 session 값을 확인할 수 있는 함수 */
  const getSession = async () => {
    const res = await instance.get("/getSession")
    // console.log("getSession res :", res);
  }

  useEffect(() => {
    getSession();
    console.log("session안에 값", JSON.parse(sessionStorage.getItem("info")));
    setSInfo(JSON.parse(sessionStorage.getItem("info")))
  }, [user]);

  

  return (
    <div className="App">
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
