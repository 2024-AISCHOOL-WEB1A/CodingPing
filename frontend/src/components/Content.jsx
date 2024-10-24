import React from 'react'

const Content = () => {
  return (
    <section className="wt-envelope" id="section-fee" >
      <div className="wt-envelope-fill -tertiary"></div>
      {/* 이모지 파티클 부분 */}
      <div className="wt-envelope-particle">
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
                It's Your Money <br />Stop paying fees
              </h2>
            </div>
            <div className="wt-envelope-text">
              <p>Fee Free Banking is possible</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Content