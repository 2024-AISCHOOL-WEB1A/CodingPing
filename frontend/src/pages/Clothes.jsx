import React, { useEffect, useRef, useState } from 'react';
import instance from '../axios';
import { Loader2 } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const Clothes = ({ sInfo }) => {
  // 상태 관리를 위한 useState
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [measurements, setMeasurements] = useState({}); // 각 입력 필드 값을 저장할 상태
  const [isLoading, setIsLoading] = useState(false)
  const [isProcessingComplete, setIsProcessingComplete] = useState(false);
  const [imagePath, setimagePath] = useState("");

  // formRef 생성
  const formRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state || {};
  
  useEffect(() => {
    console.log("Measurement.jsx에서 가져온 이미지 경로 : ", data.imagePath);
    setimagePath(data.imagePath);
  }, [data.imagePath]);


  const categories = [
    { title: '반팔', image: '/img/short.png' },
    { title: '긴팔', image: '/img/long.png' },
    { title: '긴바지', image: '/img/pants.jpg' },
    { title: '반바지', image: '/img/shorts.jpg' },
    { title: '추후 업데이트 예정', image: '/img/update.png' }
  ];

  // 상의, 하의 카테고리 그룹화
  const TOPS = ['반팔', '긴팔'];
  const BOTTOMS = ['긴바지', '반바지'];

  // 각 타입별로 입력 필드를 객체로 정의
  const measurementFields = {
    tops: [
      { label: '총장', name: 'length' },
      { label: '어깨', name: 'shoulder' },
      { label: '가슴', name: 'chest' },
      { label: '소매', name: 'sleeve' }
    ],
    bottoms: [
      { label: '총장', name: 'length' },
      { label: '허리', name: 'waist' },
      { label: '엉덩이', name: 'hip' },
      { label: '허벅지', name: 'thigh' }
    ]
  };



  // 카테고리 클릭 처리를 위한 함수
  const handleCategoryClick = (categoryTitle) => {
    if (categoryTitle !== '추후 업데이트 예정') {
      if (selectedCategory === categoryTitle) {
        setIsFormVisible(!isFormVisible);
      } else {
        setSelectedCategory(categoryTitle);
        setIsFormVisible(true);
      }
    }
  };

  // 현재 선택된 카테고리에 따라 적절한 필드를 반환하는 함수
  const getFieldsForCategory = (category) => {
    if (TOPS.includes(category)) {
      return measurementFields.tops;
    } else if (BOTTOMS.includes(category)) {
      return measurementFields.bottoms;
    }
    return [];
  };

  // 외부 클릭 감지 함수
  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setIsFormVisible(false);
    }
  };

  // useEffect로 외부 클릭 이벤트 추가 및 제거
  useEffect(() => {
    if (isFormVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFormVisible]);

  // 입력값 변경을 처리하는 함수
  const handleInputChange = (event, field) => {
    let value = event.target.value;

    // 최대 5글자 (소수점 포함) 및 소수점 첫째 자리까지만 허용하는 정규식
    const isValid = /^(\d{1,4}(\.\d{0,1})?)?$/.test(value);

    if (isValid) {
      // 유효한 입력인 경우에만 상태를 업데이트
      setMeasurements((prev) => ({
        ...prev,
        [field.name]: value
      }));
    }
  };

  // 폼이 닫힐 때 measurements 상태를 초기화
  useEffect(() => {
    if (!isFormVisible) {
      setMeasurements({}) // measurements를 초기화
    }
  }, [isFormVisible])

  // 폼 제출(완료 버튼을 클릭) 시 호출되는 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 처리가 완료된 후 버튼을 눌렀을 때
    if (isProcessingComplete) {
      navigate('/heatmap') // 히트맵 페이지로 이동
      return;
    }
    setIsLoading(true)

    console.log(measurements, selectedCategory);
    try {
      const res = await instance.post("/fitting/clothes", { inputSizes: measurements, clothesType: selectedCategory, userId: sInfo.user_id, imagePath: imagePath });
      // 처리 완료 상태로 변경
      setIsLoading(false);
      setIsProcessingComplete(res.data.success);
      console.log(isProcessingComplete);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="clothes-container">
      <div className='page-header'>
        <h1 className='page-title text-4xl font-bold mb-4'>의류치수 입력 페이지</h1>
        <p className='page-description text-lg mb-8 text-gray-700'>
          이 페이지는 착용감을 확인하시기를 원하는 의류의 카테고리를 정하고 치수 정보를 입력할 수 있는 페이지입니다.
        </p>
      </div>

      {/* 로딩화면 UI */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 fixed-loader">
          <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
            <Loader2 className="animate-spin h-12 w-12 text-blue-500 mb-4" />
            <p className="text-lg font-medium text-gray-700">처리중...</p>
            <p className="text-sm text-gray-500">잠시만 기다려주세요</p>
          </div>
        </div>
      )}

      <div className={`category-grid ${isFormVisible ? 'shift-up' : ''}`}>
        {categories.map((category, index) => (
          <div
            key={index}
            className={`category-item ${selectedCategory === category.title ? 'active' : ''} ${category.title === '추후 업데이트 예정' ? 'disabled' : ''}`}
          >
            <div
              className="category-content"
              onClick={() => handleCategoryClick(category.title)}
            >
              <div className="category-card">
                <img
                  src={category.image}
                  alt={category.title}
                  className="category-image"
                />
              </div>
              <div className="category-title">
                <h3>{category.title}</h3>
              </div>
            </div>
            {selectedCategory === category.title && (
              <div ref={formRef} className={`form-container ${isFormVisible ? 'visible' : ''} z-40`}>
                <div className={`form-card ${isFormVisible ? 'slide-down' : ''}`}>
                  <h2 className="form-title">의류 정보 입력</h2>
                  <form className="measurement-form" onSubmit={handleSubmit}>
                    {getFieldsForCategory(selectedCategory).map((field) => (
                      <div key={field.name} className="form-field">
                        <label className="field-label">{field.label}</label>
                        <div className="input-wrapper">
                          <input
                            type="text"
                            className="measurement-input"
                            placeholder='00.0'
                            name={field.name}
                            value={measurements[field.name] || ''}
                            onChange={(e) => handleInputChange(e, field)} // 입력 핸들러 추가
                          />
                          <span className="unit">cm</span>
                        </div>
                      </div>
                    ))}
                    <button type="submit" className='btn_clothes' disabled={isLoading}>
                      {isLoading ? '처리중...' : isProcessingComplete ? 'next' : '완료'}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clothes;
