import { Route, Routes } from 'react-router-dom';
import './App.css';
import instance from './axios';
import Join from './pages/Join';
import Home from './pages/Home';
import Login from './pages/Login';
import Measurement from './pages/Measurement';

function App() {


  // < 로그아웃 하려고 만듬 >
  const logout = async () => {
    console.log("로그아웃 함수");
    const res = await instance.get("/logout");
    console.log("logout res :", res.data);

    // sessionStorage 값 지우기
    sessionStorage.removeItem("info");

    alert("다음에 또 방문해주세요 ~!");
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/join' element={<Join />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='measurement' element={<Measurement/>}></Route>
      </Routes>

      <button onClick={logout}>로그아웃</button>
    </div>
  );
}

export default App;
