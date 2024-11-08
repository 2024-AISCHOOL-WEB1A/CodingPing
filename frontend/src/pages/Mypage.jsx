import React from 'react';

const Mypage = ({setUser}) => {
  
  const tableData = [
    ['', '상체길이', '가슴둘레', '팔뚝길이', '팔길이', '다리길이', '허벅지길이', '허리둘레', '엉덩이둘레'],
    ['2023.10.24', '', '', '', '', '', '', '', ''],
    ['2024.02.04', '', '', '', '', '', '', '', ''],
    ['2024.10.27', '', '', '', '', '', '', '', '']
  ];

  return (
    <div className='body-container'>
      <div className='content-wrapper'>
        {/* 왼쪽 인체 실루엣 */}
        <div className='body-section'>
          <img src='/img/bodyshape2.png' alt="body silhouette" />
          <div className='stats-section'>
            <div className='stat-item'>
              <div className='value'>189<span>cm</span></div>
              <div className='label'>키</div>
            </div>
            <div className='stat-item'>
              <div className='value'>87<span>kg</span></div>
              <div className='label'>몸무게</div>
            </div>
          </div>
        </div>
        
        {/* 오른쪽 신체 치수 테이블 섹션 */}
        <div className="table-container">
          <h2 className="welcome-text">유승재님 환영합니다.</h2>
          <div className="table-section">
            <table>
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, colIndex) => (
                      <td key={colIndex}>
                        <div className="table-cell-content">
                          {cell}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;