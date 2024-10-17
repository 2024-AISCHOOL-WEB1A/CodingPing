import React, { useState } from 'react'
import instance from '../axios'

const Join = () => {

    const [id, setId] = useState()
    const [pw, setPw] = useState()
    const [userName, setUserName] = useState()
    const [userGender, setUserGender] = useState()
    const [userBirth, setUserBirth] = useState()


    const sendData = async (e) => {
        e.preventDefault()

        // try / catch : 예외 처리, 에러가 발생할 가능성이 있는 부분을 try-catch
        try {
            const res = await instance.post("/join", { id: id, pw: pw, name: userName, gender: userGender, birth: userBirth });
            console.log("res result :", res.data.result);

            if (res.data.result === "success") {
                window.alert("성공 !!");
            } else {
                window.alert("실패 ..");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div> 
            <form onSubmit={sendData}>
                ID : <input type="text" onChange={(e) => { setId(e.target.value) }}></input><br/>
                PW : <input type="password" onChange={(e) => { setPw(e.target.value) }}></input><br/>
                USER_NAME : <input type="text" onChange={(e) => { setUserName(e.target.value) }}></input><br/>
                USER_GENDER : <input type="text" onChange={(e) => { setUserGender(e.target.value) }}></input><br/>
                USER_BIRTH : <input type="date" onChange={(e) => { setUserBirth(e.target.value) }}></input><br/>
                <input type="submit"></input>
            </form>
        </div>
    )
}

export default Join