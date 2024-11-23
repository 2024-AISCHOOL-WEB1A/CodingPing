import React from 'react'
import { useNavigate } from 'react-router-dom';

const EndComponent = ({user, setUser}) => {
  const navigate = useNavigate();

  const isLoggedIn = () => {
    const sessionInfo = sessionStorage.getItem("info");
    if (sessionInfo) {
      const info = JSON.parse(sessionInfo);
      return info.auth === "user" && info.user_id;
    }
    return false;
  }

  const handleButtonClick = () => {
    if (isLoggedIn()) {
      navigate('/measurement');
    } else {
      navigate('/join');
    }
  }

  return (
    <section className="wt-getapp" id="section-getapp">
      <div className="wt-getapp-fill"></div>
      <div className="wt-getapp-fill2"></div>
      <div className="wt-getapp-content">
        <div className="wt-getapp-body -offset">
          <div className="wt-getapp-container">
            <div className="wt-getapp-header" data-cursor="-exclusion">
              <h2>
                CloOn <br />시작해보세요!
              </h2>
            </div>
            <div className="wt-getapp-store">
              <div className="wt-getapp-store-item">
                <button 
                  className="wt-btn wt-btn_store -apple"
                  onClick={handleButtonClick}
                >
                  <span className="wt-btn_store-ico">
                    <svg className="wt-svgsprite -apple">
                      <use xlinkHref="/assets/img/sprites/svgsprites.svg#apple"></use>
                    </svg>
                  </span>
                  <span className="wt-btn_store-title">
                    CloOn <br/> 
                    {isLoggedIn() ? "측정 시작하기" : "회원가입하기"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EndComponent