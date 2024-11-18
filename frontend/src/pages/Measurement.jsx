// Measurement.jsx
import React, { useEffect, useState } from 'react';
import instance from '../axios';

const Measurement = ({ sInfo }) => {
	const [gender, setGender] = useState("male");
	const [height, setHeight] = useState("");
	const [weight, setWeight] = useState("");
	const [image, setImage] = useState(null);
	const [imagePath, setImagePath] = useState("");

  // imagePath 상태가 업데이트 될 때마다 콘솔에 로그 출력
  useEffect(() => {
    if (imagePath) {
      console.log("imagePath", imagePath);
    }
  }, [imagePath]);

  // 성별 선택 시 호출되는 핸들러
  const handleGenderChange = (value) => {
    setGender(value);
  };

  // 입력값 변경을 처리하는 함수
  const handleInputChange = (event, field) => {
    const value = event.target.value;

    // 최대 5글자 (소수점 포함) 및 소수점 첫째 자리까지만 허용하는 정규식
    const isValid = /^(\d{1,4}(\.\d{0,1})?)?$/.test(value);

    if (isValid) {
      // type에 따라 해당하는 상태 업데이트
      if (field === 'height') {
        setHeight(value);
      } else if (field === 'weight') {
        setWeight(value);
      }
    }
  };

  // 드래그 앤 드랍 관련 함수
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setImage(files[0]);
    }
  };

  // 이미지 파일 선택 시 호출되는 핸들러
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  // 폼 제출 (next 버튼을 클릭) 시 호출되는 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

		// FormData 객체 생성 : FormData 는 key, value 형식으로 되어있는 객체
		const formData = new FormData();  // formData.append('key', value);
		formData.append("userId", sInfo.user_id);
		formData.append("gender", gender);
		formData.append("height", height);
		formData.append("weight", weight);
		formData.append("image", image);

    try {
      // 서버로 FormData 전송
      const res = await instance.post("/measurement", formData, {
        headers: { "Content-Type": "multipart/form-data" } // 요청 헤더 설정
      });
      // 요청 본문에 포함된 데이터 형식을 지정
      // multipart / form-data : 파일 업로드와 같은 복합 데이터 형식을 전송하기
      // 위해 사용되는 콘텐츠 타입, 텍스트 필드와 파일 데이터 모두 포함 할 수 있게 설계됨
      console.log(res.data.data.image_path);
      setImagePath(res.data.data.image_path);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='input-container'>
      <div className='page-header'>
        <h1 className='page-title'>신체치수 측정 페이지</h1>
        <p className='page-description'>
          이 페이지는 체형분석을 원하는 본인의 사진과 키, 체중을 입력하는 페이지입니다.
        </p>
      </div>

      <div className='image-upload'>
        {/* 이미지 업로드 영역 */}
        <label 
          className={`file-drop-zone ${image ? 'has-file' : ''}`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input 
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="hidden-file-input"
            required
          />
          {imagePath ? (
            <img 
              src={`http://localhost:3007/image/${imagePath}`} 
              alt="Uploaded" 
              className="uploaded-image"
            />
          ) : (
            <div className="upload-content">
              <span className="upload-icon">📁</span>
              <span className="upload-text">
                {image ? image.name : '이미지를 드래그하거나\n클릭하여 업로드'}
              </span>
            </div>
          )}
        </label>

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              성별
              <div className="gender-buttons">
                <input
                  className={`input-gender-button ${gender === 'male' ? 'selected' : ''}`}
                  type="button"
                  value="남성"
                  onClick={() => handleGenderChange('male')}
                />
                <input
                  className={`input-gender-button ${gender === 'female' ? 'selected' : ''}`}
                  type="button"
                  value="여성"
                  onClick={() => handleGenderChange('female')}
                />
              </div>
            </label>
          </div>

          <div className="input-input-group">
            <label>
              신장
              <input
                type="text"
                value={height}
                onChange={(e) => handleInputChange(e, 'height')}
                placeholder="cm"
                required
              />
            </label>
          </div>

          <div className="input-input-group">
            <label>
              체중
              <input
                type="text"
                value={weight}
                onChange={(e) => handleInputChange(e, 'weight')}
                placeholder="kg"
                required
              />
            </label>
          </div>

          <button type="submit" className="submit-button">
            next
          </button>
        </form>
      </div>
    </div>
  );
}

export default Measurement;