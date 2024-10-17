import React, { useState } from 'react'
import instance from '../axios'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [id, setId] = useState();
    const [pw, setPw] = useState();
    const nav = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const res = await instance.post("/login", { id: id, pw: pw });
            console.log("res result :", res.data.result);

            if (res.data.result === "success") {
                let obj = {
                    auth: "user",
                    user_id: res.data.id
                }
                sessionStorage.setItem("info", JSON.stringify(obj));
    
                alert("환영합니다 !!");
                nav("/");

            } else {
                window.alert("실패 ..");
            }
        } catch (err) {
            console.log("로그인 중 오류 발생 : ", err);
            window.alert("로그인 중 오류가 발생했습니다 !");
        }
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                ID : <input type="text" onChange={(e) => { setId(e.target.value) }}></input><br />
                PW : <input type="password" onChange={(e) => { setPw(e.target.value) }}></input><br />
                <input type="submit"></input>
            </form>
        </div>
    )
}

export default Login