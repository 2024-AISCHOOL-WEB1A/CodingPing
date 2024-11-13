import React, { useEffect, useRef, useState } from 'react';

const Clothes = () => {
  const categories = [
    {
      title: '반팔',
      image: '/img/short.png',
    },
    {
      title: '긴팔',
      image: '/img/long.png',
    },
    {
      title: '긴바지',
      image: '/img/pants.jpg',
    },
    {
      title: '반바지',
      image: '/img/shorts.jpg',
    },
    {
      title: '추후 업데이트 예정',
      image: '/img/update.png',
    }
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

  // 상태 관리를 위한 useState
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [measurements, setMeasurements] = useState({}); // 각 입력 필드 값을 저장할 상태

  // formRef 생성
  const formRef = useRef(null);

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

  return (
    <div className="clothes-container">
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
              <div ref={formRef} className={`form-container ${isFormVisible ? 'visible' : ''}`}>
                <div className={`form-card ${isFormVisible ? 'slide-down' : ''}`}>
                  <h2 className="form-title">의류 정보 입력</h2>
                  <form className="measurement-form">
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
                    <button type="submit" className='btn_clothes'>
                      완료
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
