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
                    <img src="/assets/img/figure/1/1.png" srcSet="/assets/img/figure/1/1@2x.png 2x" alt="" />
                    <img src="/assets/img/figure/1/2.png" srcSet="/assets/img/figure/1/2@2x.png 2x" alt="" />
                    <img src="/assets/img/figure/1/3.png" srcSet="/assets/img/figure/1/3@2x.png 2x" alt="" />
                  </div>
                </div>
                <div className="wt-description-grid-col -right">
                  <div className="wt-description-header" data-cursor="-exclusion">
                    <h2>Get Paid early</h2>
                  </div>
                  <div className="wt-description-text">
                    <p>Your paycheck will be automatically deposited up to two days early</p>
                  </div>
                  <div className="wt-description-action">
                    <button className="wt-btn wt-btn_rounded -transparent" data-section-target="getapp" type="button">
                      <span className="wt-btn_rounded-bound">
                        <span data-text="Download">Download</span>
                      </span>
                    </button>
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
                  Customer Service<br />on Your Terms
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