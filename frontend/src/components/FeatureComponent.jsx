import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap'; // gsap 설치해야됨

const FeatureComponent = () => {
  const componentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.from(componentRef.current, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out"
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  return (
    <section className="wt-feature" ref={componentRef}>
      <div className="wt-feature-fill -secondary"></div>
      <div className="wt-feature-content">
        <div className="wt-feature-body">
          <div className="wt-feature-container">
            <div className="wt-feature-grid">
              <div className="wt-feature-grid-col -left">
                <div className="wt-feature-demo">
                  <div className="wt-feature-demo-item -visible">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 463 463">
                      <defs>
                        <filter id="feaute-demo-filter-1">
                          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.003" stitchTiles="noStitch"
                            numOctaves="5" seed="2" result="warp"></feTurbulence>
                          <feDisplacementMap xChannelSelector="R" yChannelSelector="B" scale="1" in="SourceGraphic"
                            in2="warp"></feDisplacementMap>
                        </filter>
                      </defs>
                      <image xlinkHref="/assets/img/screens/1@2x.png" style={{ filter: 'url(#feaute-demo-filter-1)' }}
                        width="463" height="463" x="0" y="0"></image>
                    </svg>
                  </div>
                  <div className="wt-feature-demo-item">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 463 463">
                      <defs>
                        <filter id="feaute-demo-filter-2">
                          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.003" stitchTiles="noStitch"
                            numOctaves="5" seed="2" result="warp"></feTurbulence>
                          <feDisplacementMap xChannelSelector="R" yChannelSelector="B" scale="1" in="SourceGraphic"
                            in2="warp"></feDisplacementMap>
                        </filter>
                      </defs>
                      <image xlinkHref="/assets/img/screens/2@2x.png" style={{ filter: 'url(#feaute-demo-filter-2)' }}
                        width="463" height="463" x="0" y="0"></image>
                    </svg>
                  </div>
                  <div className="wt-feature-demo-item">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 463 463">
                      <defs>
                        <filter id="feaute-demo-filter-3">
                          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.003" stitchTiles="noStitch"
                            numOctaves="5" seed="2" result="warp"></feTurbulence>
                          <feDisplacementMap xChannelSelector="R" yChannelSelector="B" scale="1" in="SourceGraphic"
                            in2="warp"></feDisplacementMap>
                        </filter>
                      </defs>
                      <image xlinkHref="/assets/img/screens/3@2x.png" style={{ filter: 'url(#feaute-demo-filter-3)' }}
                        width="463" height="463" x="0" y="0"></image>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="wt-feature-grid-col -right">
                <div className="wt-feature-items" role="list">
                  <div className="wt-feature-item -active" role="listitem">
                    Real-time alerts <s className="wt-sprite -e-alarm"></s>
                    next day settlement
                  </div>
                  <div className="wt-feature-item" role="listitem">
                    Flexible billing <s className="wt-sprite -e-book"></s>
                    and payments
                  </div>
                  <div className="wt-feature-item" role="listitem">
                    Banking for all <s className="wt-sprite -e-darts"></s>
                    personal, business
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

export default FeatureComponent;