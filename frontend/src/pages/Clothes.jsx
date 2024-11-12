// Clothes.jsx
import React, { useState } from 'react';


const Clothes = () => {
  const categories = [
    {
      title: '반팔',
      image: '/img/pad.png',
    },
    {
      title: '긴팔',
      image: '/img/pad.png',
    },
    {
      title: '긴바지',
      image: '/img/pad.png',
    },
    {
      title: '반바지',
      image: '/img/pad.png',
    },
    {
      title: '추후 업데이트 예정',
      image: '/img/pad.png',
    }
  ];

  // 상의, 하의 카테고리 그룹화
  const TOPS = ['반팔', '긴팔']
  const BOTTOMS = ['긴바지', '반바지']

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
  }

  // 상태 관리를 위한 useState
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // 카테고리 클릭 처리를 위한 함수
  const handleCategoryClick = (categoryTitle) => {
    if (categoryTitle !== '추후 업데이트 예정') {
      setSelectedCategory(categoryTitle);
      setIsFormVisible(!isFormVisible); // 토글 형태로 변경
    }
  }

  // 현재 선택된 카테고리에 따라 적절한 필드를 반환하는 함수
  const getFieldsForCategory = (category) => {
    if (TOPS.includes(category)) {
      return measurementFields.tops;
    } else if (BOTTOMS.includes(category)) {
      return measurementFields.bottoms;
    }
    return [];
  }

  return (
    <div className="clothes-container">
      {/* Categories Grid */}
      <div className="category-grid">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`category-item ${selectedCategory === category.title ? 'active' : ''} ${category.title === '추후 업데이트 예정' ? 'disabled' : ''}`}
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
        ))}
      </div>
      {/* Measurement Form */}
      <div className={`form-container ${isFormVisible ? 'visible' : ''}`}>
        <div className={`form-card ${isFormVisible ? 'slide-down' : ''}`}>
          <h2 className="form-title">의류 정보 입력</h2>
          <form className="measurement-form">
            {selectedCategory && getFieldsForCategory(selectedCategory).map((field) => (
              <div key={field.name} className="form-field">
                <label className="field-label">{field.label}</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    className="measurement-input"
                    name={field.name}
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
    </div>
  );
};

export default Clothes;