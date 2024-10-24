import React from 'react'

const Main = () => {
  return (
    <header className="wt-hero">
      {/* 배경에서 움직이는 파티클 부분 */}
      {/* 카드모양 파티클 변경이 가능할 수도 */}
      <div className="wt-hero-particle">
        <div className="wt-particle">
          <div className="wt-particle-item -v1">
            <s className="wt-sprite -wcard"></s>
          </div>
          <div className="wt-particle-item -v2">
            <s className="wt-sprite -wcard"></s>
          </div>
          <div className="wt-particle-item -v3">
            <s className="wt-sprite -wcard"></s>
          </div>
          <div className="wt-particle-item -v4">
            <s className="wt-sprite -wcard"></s>
          </div>
          {/* 원모양 파티클 */}
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
      {/* 주요 컨텐츠 내용이 있는 부분 */}
      <div className="wt-hero-content">
        <div className="wt-hero-body">
          <div className="wt-hero-container">
            <div className="wt-hero-header">
              <div className="wt-hero-header-shape">
                <div className="wt-hero-header-shape-item -v1"></div>
                <div className="wt-hero-header-shape-item -v2"></div>
                <div className="wt-hero-header-shape-item -v3"></div>
              </div>
              <div className="wt-hero-header-blend">
                {/* 메인페이지에 스크롤 다운하면 글씨가 변경되는 부분 */}
                <h1>
                  Wear <br />
                  <span data-textset='["accurate ", "Easy", "Fun", "Comfort"]'>accurate</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="wt-hero-footer">
          {/* 클래스 내에 카드와 폰 이미지가 있지만 우리가 사용하지 않기 때문에 추후 활용 가능성 생각해보기 */}
          <div className="wt-hero-demo">
            <div className="wt-hero-card"></div>
            <div className="wt-hero-phone">
              <div className="wt-phone">
                <div className="wt-phone-shadow"></div>
                <div className="wt-phone-case"></div>
                <div className="wt-phone-screen">
                  {/* 비디오 안 쓰니까 지워도 되는 부분일 거 같긴한데 아직 보류 
                        주석처리 풀 시 비디오 재생관련 오류가 발생함
                      */}
                  <div className="wt-phone-screen-video">
                    {/* <video preload="auto" loop muted autoPlay playsInline>
                          <source src="/assets/video/hello.mp4" type="video/mp4" />
                        </video> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Main