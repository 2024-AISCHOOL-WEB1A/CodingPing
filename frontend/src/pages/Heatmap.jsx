import React, { useEffect, useState } from 'react'

const Heatmap = ({ sInfo }) => {
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const userId = sInfo.user_id;
        // API 경로를 전체 URL로 수정하고 인코딩 추가
        const encodedUserId = encodeURIComponent(userId);
        const response = await fetch(`http://localhost:3007/fitting/heatmap/${encodedUserId}`);
        
        // 응답 상태 확인
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 응답 타입 확인을 위한 로깅
        console.log('Response headers:', response.headers.get('content-type'));
        
        const data = await response.json();
        console.log('Received data:', data); // 받은 데이터 로깅
        
        if (data.success) {
          setImageData({
            path: data.imagePath,
            createdAt: new Date(data.createdAt).toLocaleString()
          });
        } else {
          setError(data.message || "이미지를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("Error details:", error); // 자세한 에러 정보 로깅
        setError(`이미지를 불러오는 데 실패했습니다. (${error.message})`);
      }
    };

    if (sInfo && sInfo.user_id) {
      console.log('Fetching for user:', sInfo.user_id); // 사용자 ID 로깅
      fetchImage();
    }
  }, [sInfo]);

  // 디버깅을 위한 상태 출력
  console.log('Current state:', { imageData, error, sInfo });

  return (
    <div className='heatmap-container'>
      <div className='page-header'>
        <h1 className='page-title'>히트맵 결과 페이지</h1>
        <p className='page-description'>
          이 페이지에서 히트맵으로 옷의 피팅감을 확인하실 수 있습니다 <br/>
          빨간색으로 갈수록 핏이 타이트하고 파란색으로 갈수록 핏이 여유롭다는 것을 의미합니다.
        </p>
        <img src='/img/heatmap.png' className='heatmap-image'></img>

        {error ? (
          <p className="error-message">에러: {error}</p>
        ) : imageData ? (
          <div className='image-container'>
            <img
              src={imageData.path}
              alt="Uploaded"
              className="uploaded-image"
            />
            <p>업데이트 시간: {imageData.createdAt}</p>
          </div>
        ) : (
          <p>이미지를 불러오는 중입니다...</p>
        )}
      </div>
    </div>
  )
}

export default Heatmap