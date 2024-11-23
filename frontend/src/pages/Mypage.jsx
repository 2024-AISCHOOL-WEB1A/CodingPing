import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const Mypage = ({ sInfo }) => {

  const navigate = useNavigate();

  useEffect(() => {
    if (sInfo) {
      localStorage.setItem('sInfo', JSON.stringify(sInfo));
    }
  }, [sInfo]);

  const storedInfo = localStorage.getItem('sInfo');
  const parsedInfo = storedInfo ? JSON.parse(storedInfo) : null;

  // sInfo를 props로 받지 못했을 경우 parsedInfo를 사용
  const finalInfo = sInfo || parsedInfo;
  console.log(finalInfo.user_id);

  const [measurements, setMeasurements] = useState([]);
  const [latestMeasurement, setLatestMeasurement] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMeasurements = async () => {
      try {
        const response = await axios.get('/measurement/mypage', {
          params: { user_id: finalInfo.user_id }
        });

        if (response.data.measurements.length > 0) {
          setMeasurements(response.data.measurements);
          setLatestMeasurement(response.data.measurements[0]);
        } else {
          setError(true);
        }
      } catch (err) {
        setError('데이터를 불러오는데 실패했습니다.');
        console.error('Error fetching measurements:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeasurements();
  }, [finalInfo?.user_id]);

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const handleFitCheck = () => {
    navigate("/clothes", {
      state: { imagePath: selectedImage }
    });
  };


  if (isLoading) return <div>Try 버튼을 누른 후 신체 치수 측정을 완료해주세요 ...</div>;
  if (error) return <div>{error}</div>;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  return (
    <div className='body-container'>
      <div className='content-wrapper'>
        {/* 왼쪽 인체 실루엣 */}
        <div className='body-section'>
          <img src='/img/bodyshape2.png' alt="body silhouette" />

          {/* 사각형 데이터 삽입 */}
          <div className="data-box data-box-1">상체길이 {Math.round(latestMeasurement.upper_length * 100)}cm</div>
          <div className="data-box data-box-2">가슴단면 {Math.round(latestMeasurement.chest_width * 100)}cm</div>
          <div className="data-box data-box-3">팔뚝길이 {Math.round(latestMeasurement.forearm_length * 100)}cm</div>
          <div className="data-box data-box-4">팔 길이 {Math.round(latestMeasurement.arm_length * 100)}cm</div>
          <div className="data-box data-box-5">엉덩이 단면 {Math.round(latestMeasurement.hip_width * 100)}cm</div>
          <div className="data-box data-box-6">허벅지단면 {Math.round(latestMeasurement.thigh_width * 100)}cm</div>
          <div className="data-box data-box-7">다리 길이 {Math.round(latestMeasurement.leg_length * 100)}cm</div>
          <div className="data-box data-box-8">허리단면 {Math.round(latestMeasurement.waist_width * 100)}cm</div>

          {/* 키와 몸무게 */}
          <div className='stats-section'>
            <div className='stat-item'>
              <div className='value-container'>
                <div className='value'>{latestMeasurement.height}</div>
                <div className='unit'>cm</div>
              </div>
              <div className='label'>키</div>
            </div>
            <div className='stat-item'>
              <div className='value-container'>
                <div className='value'>{latestMeasurement.weight}</div>
                <div className='unit'>kg</div>
              </div>
              <div className='label'>몸무게</div>
            </div>
          </div>
        </div>

        {/* 오른쪽 신체 치수 테이블 섹션 */}
        <div className="table-container">
          <h2 className="welcome-text">마이페이지</h2>
          <div className="table-section">
            <table>
              <thead>
                <tr>
                  <th>측정 날짜</th>
                  <th>어깨 너비</th>
                  <th>가슴 단면</th>
                  <th>팔 길이</th>
                  <th>팔뚝 길이</th>
                  <th>상체 길이</th>
                  <th>허리 단면</th>
                  <th>엉덩이 단면</th>
                  <th>허벅지 단면</th>
                  <th>다리 길이</th>
                </tr>
              </thead>
              <tbody>
                {measurements.map((measurement, index) => (
                  <tr key={index} onClick={() => openModal(measurement.image)} >
                    <td>{formatDate(measurement.measurement_date)}</td>
                    <td>{Math.round(measurement.shoulder_width * 100)}</td>
                    <td>{Math.round(measurement.chest_width * 100)}</td>
                    <td>{Math.round(measurement.arm_length * 100)}</td>
                    <td>{Math.round(measurement.forearm_length * 100)}</td>
                    <td>{Math.round(measurement.upper_length * 100)}</td>
                    <td>{Math.round(measurement.waist_width * 100)}</td>
                    <td>{Math.round(measurement.hip_width * 100)}</td>
                    <td>{Math.round(measurement.thigh_width * 100)}</td>
                    <td>{Math.round(measurement.leg_length * 100)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] flex flex-col">
            <div className="relative flex-1 min-h-0 overflow-hidden">
              <img
                src={selectedImage}
                alt="Result"
                className="object-contain w-full h-full"
                style={{ maxHeight: 'calc(90vh - 120px)' }}
                onError={(e) => console.log("Image loading error:", e)}
              />
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleFitCheck}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded transition-colors"
              >
                핏 확인
              </button>
              <button
                onClick={closeModal}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



export default Mypage;