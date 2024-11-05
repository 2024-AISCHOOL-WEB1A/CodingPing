import React from 'react'

const Envelope = () => {
  return (
    <>
      <section className="wt-envelope">
        <div className="wt-envelope-fill -tertiary"></div>
        <div className="wt-envelope-particle -lg">
          <div className="wt-envelope-particle-item -v1" data-magnetic>
            <s className="wt-sprite -e-ok"></s>
          </div>
          <div className="wt-envelope-particle-item -v2" data-magnetic>
            <s className="wt-sprite -e-moneybag"></s>
          </div>
          <div className="wt-envelope-particle-item -v3" data-magnetic>
            <s className="wt-sprite -e-clutch"></s>
          </div>
          <div className="wt-envelope-particle-item -v4" data-magnetic>
            <s className="wt-sprite -e-money"></s>
          </div>
          <div className="wt-envelope-particle-item -v5" data-magnetic>
            <s className="wt-sprite -e-clutch"></s>
          </div>
          <div className="wt-envelope-particle-item -v6" data-magnetic>
            <s className="wt-sprite -e-ok"></s>
          </div>
          <div className="wt-envelope-particle-item -v7" data-magnetic>
            <s className="wt-sprite -e-money"></s>
          </div>
          <div className="wt-envelope-particle-item -v8" data-magnetic>
            <s className="wt-sprite -e-moneybag"></s>
          </div>
        </div>
        <div className="wt-envelope-content">
          <div className="wt-envelope-body">
            <div className="wt-envelope-container">
              <div className="wt-envelope-header" data-cursor="-exclusion">
                <h2>
                  강력한 AI 기술로 만드는 <br />비즈니스의 새로운 기준
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="wt-description">
        <div className="wt-description-content">
          <div className="wt-description-body">
            <div className="wt-description-container">
              <div className="wt-description-grid">
                <div className="wt-description-grid-col -left">
                  <div className="wt-description-header" data-cursor="-exclusion">
                    <h2>비즈니스 혁신을 위한</h2>
                    <h2>스마트 사이즈 솔루션</h2>
                  </div>
                  <div className="wt-description-text">
                    <p>반품 처리 비용 절감,
                      <br />
                      고객 만족도 증가,
                      <br />
                      매출 향상까지.</p>
                  </div>
                </div>
                <div className="wt-description-grid-col -right">
                  <div className="wt-description-figure -multiple" data-cursor="-exclusion">
                    <img src="/img/1.png" srcSet="/assets/img/figure/2/1@2x.png 2x" alt="" />
                    <img src="/img/notebook.png" srcSet="/assets/img/figure/2/2@2x.png 2x" alt="" />
                    <img src="/img/phone1.png" srcSet="/assets/img/figure/2/3@2x.png 2x" alt="" />
                    {/* <img src="/img/4.png" srcSet="/assets/img/figure/2/4@2x.png 2x" alt="" /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Envelope