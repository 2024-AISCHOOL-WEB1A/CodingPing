import React from 'react'

const Description = () => {
  return (
    <>
      <section className="wt-description">
        <div className="wt-description-content -top">
          <div className="wt-description-body">
            <div className="wt-description-container">
              <div className="wt-description-grid">
                <div className="wt-description-grid-col -left">
                  <div className="wt-description-figure -multiple" data-cursor="-exclusion">
                    <img src="/img/2.png" srcSet="/assets/img/figure/1/1@2x.png 2x" alt="" />
                    <img src="/img/shopping1.png" srcSet="/img/shopping1.png 2x" alt="" />
                    <img src="/img/3.png" srcSet="/img/3.png 2x" alt="" />
                  </div>
                </div>
                <div className="wt-description-grid-col -right">
                  <div className="wt-description-header" data-cursor="-exclusion">
                    <h2>쇼핑을 더욱 쉽고 편하게 </h2>
                  </div>
                  <div className="wt-description-text">
                    <p>그 동안 헷갈리던 사이즈에 대한 고민을 줄여드리겠습니다 </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="wt-envelope">
        <div className="wt-envelope-fill -secondary"></div>
        <div className="wt-envelope-particle">
          {[...Array(8)].map((_, index) => (
            <div key={index} className={`wt-envelope-particle-item -v${index + 1}`} data-magnetic>
              <s className="wt-sprite -e-diamond"></s>
            </div>
          ))}
        </div>
        <div className="wt-envelope-content">
          <div className="wt-envelope-body">
            <div className="wt-envelope-container">
              <div className="wt-envelope-header" data-cursor="-exclusion">
                <h2>
                  당신만의 완벽한 핏을<br />당신의 방식대로
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Description