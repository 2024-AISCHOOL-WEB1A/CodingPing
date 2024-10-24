import React from 'react';

const AdvantageComponent = () => {
  return (
    <section className="wt-advantage" id="section-security">
      {/* 파티클 부분 */}
      <div className="wt-advantage-particle">
        <div className="wt-particle">
          <div className="wt-particle-item -v20">
            <s className="wt-sprite -e-key"></s>
          </div>
          <div className="wt-particle-item -v21">
            <s className="wt-sprite -e-key"></s>
          </div>
          <div className="wt-particle-item -v22">
            <s className="wt-sprite -e-key"></s>
          </div>
          {/* 도트 파티클 부분 */}
          <div className="wt-particle-item -v5 -dot"></div>
          <div className="wt-particle-item -v6 -dot"></div>
          <div className="wt-particle-item -v7 -dot"></div>
          <div className="wt-particle-item -v8 -dot"></div>
          <div className="wt-particle-item -v9 -dot"></div>
          <div className="wt-particle-item -v10 -dot"></div>
          <div className="wt-particle-item -v11 -dot"></div>
          <div className="wt-particle-item -v12 -dot"></div>
          <div className="wt-particle-item -v13 -dot"></div>
        </div>
      </div>
      <div className="wt-advantage-content">
        <div className="wt-advantage-body">
          <div className="wt-advantage-container">
            <div className="wt-advantage-header">
              <div className="wt-advantage-header-shape">
                <div className="wt-advantage-header-shape-item -v1"></div>
                <div className="wt-advantage-header-shape-item -v2"></div>
                <div className="wt-advantage-header-shape-item -v3"></div>
              </div>
              <div className="wt-advantage-header-blend">
                <h2>Security</h2>
              </div>
            </div>
            <div className="wt-advantage-details">
              <div className="wt-advantage-grid">
                <div className="wt-advantage-grid-col">
                  <div className="wt-advantage-text">
                    <p>
                      <b>Superior Security.</b>
                      Security and fraud prevention is at the core of our business.
                    </p>
                  </div>
                </div>
                <div className="wt-advantage-grid-col">
                  <div className="wt-advantage-text">
                    <p>
                      <b>Fraud Protection.</b>
                      Our fraud tools can help your business minimize lost sales.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvantageComponent;