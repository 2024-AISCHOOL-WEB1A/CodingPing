import React from 'react'

const NotFoundPage = () => {
  return (
    <div className='page_wrapper'>
      <div className='notfound_container'>
        <img src='/img/404.png' alt='페이지를 찾을 수 없습니다.' className='notfound_img'></img>
        <h3>페이지를 찾을 수 없습니다.<br />
          존재하지 않는 주소를 입력하셨거나<br />
          요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
        </h3>
      </div>
    </div>

  )
}

export default NotFoundPage