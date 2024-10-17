import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <Link to="/join">회원가입</Link> <br />
            <Link to="/login">login</Link> 
        </div>
    )
}

export default Home