import React, { useEffect, useState } from 'react';
import axios from '../axios';

const Mypage = ({ sInfo }) => {

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

  useEffect(() => {
    const fetchMeasurements = async () => {
      try {
        const response = await axios.get('/measurement/mypage', {
          params: { user_id: finalInfo.user_id }
        });
        if (response.data.measurements.length > 0) {
          setMeasurements(response.data.measurements);
          setLatestMeasurement(response.data.measurements[0]);
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

  if (isLoading) return <div>로딩중...</div>;
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
                <div className="data-box data-box-1">상체길이 {latestMeasurement.upper_body_length}cm</div>
                <div className="data-box data-box-2">가슴둘레 {latestMeasurement.chest_circ}cm</div>
                <div className="data-box data-box-3">팔뚝길이 {latestMeasurement.forearm_length}cm</div>
                <div className="data-box data-box-4">팔 길이 {latestMeasurement.arm_length}cm</div>
                <div className="data-box data-box-5">엉덩이둘레 {latestMeasurement.hip_circ}cm</div>
                <div className="data-box data-box-6">허벅지길이 {latestMeasurement.thigh_length}cm</div>
                <div className="data-box data-box-7">다리 길이 {latestMeasurement.leg_length}cm</div>
                <div className="data-box data-box-8">허리둘레 {latestMeasurement.waist_circ}cm</div>

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
                                <th>측정날짜</th>
                                <th>상체길이</th>
                                <th>어깨너비</th>
                                <th>가슴너비</th>
                                <th>팔뚝 길이</th>
                                <th>팔 길이</th>
                                <th>다리길이</th>
                                <th>허리너비</th>
                                <th>엉덩이둘레</th>
                                <th>가슴둘레</th>
                                <th>허벅지길이</th>
                                <th>허리둘레</th>
                            </tr>
                        </thead>
                        <tbody>
                            {measurements.map((measurement, index) => (
                                <tr key={index}>
                                    <td>{formatDate(measurement.measurement_date)}</td>
                                    <td>{measurement.upper_body_length}</td>
                                    <td>{measurement.shoulder_width}</td>
                                    <td>{measurement.chest_width}</td>
                                    <td>{measurement.forearm_length}</td>
                                    <td>{measurement.arm_length}</td>
                                    <td>{measurement.leg_length}</td>
                                    <td>{measurement.waist_width}</td>
                                    <td>{measurement.hip_circ}</td>
                                    <td>{measurement.chest_circ}</td>
                                    <td>{measurement.waist_circ}</td>
                                    <td>{measurement.thigh_length}</td>
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