import React from 'react'

const EndComponent = () => {
  return (
    <section className="wt-getapp" id="section-getapp">
      <div className="wt-getapp-fill"></div>
      <div className="wt-getapp-fill2"></div>
      <div className="wt-getapp-content">
        <div className="wt-getapp-body -offset">
          <div className="wt-getapp-container">
            <div className="wt-getapp-header" data-cursor="-exclusion">
              <h2>
                Download the app <br />to get started
              </h2>
            </div>
            <div className="wt-getapp-store">
              <div className="wt-getapp-store-item">
                <button className="wt-btn wt-btn_store -apple" disabled>
                  <span className="wt-btn_store-ico">
                    <svg className="wt-svgsprite -apple">
                      <use xlinkHref="/assets/img/sprites/svgsprites.svg#apple"></use>
                    </svg>
                  </span>
                  <span className="wt-btn_store-title">
                    Soon on <br />
                    <b>App Store</b>
                  </span>
                </button>
              </div>
              <div className="wt-getapp-store-item">
                <button className="wt-btn wt-btn_store -gplay" disabled>
                  <span className="wt-btn_store-ico">
                    <svg className="wt-svgsprite -gplay-c">
                      <use xlinkHref="/assets/img/sprites/svgsprites.svg#gplay-c"></use>
                    </svg>
                  </span>
                  <span className="wt-btn_store-title">
                    Soon on <br />
                    <b>Google Play</b>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="wt-getapp-footer">
          <div className="wt-getapp-footer-container">
            <a className="wt-getapp-dev" href="//cuberto.com" target="_blank"
              aria-label="Design & Development by Cuberto" rel="noopener">
              <img src="/assets/img/cuberto.png" srcSet="/assets/img/cuberto@2x.png 2x" alt="" />
              <span>Design & Development</span>
            </a>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default EndComponent