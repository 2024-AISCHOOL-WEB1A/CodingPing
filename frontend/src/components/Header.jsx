import React from 'react'

const Header = () => {
  return (
    <nav className="wt-navbar">
      <div className="wt-navbar-strip">
        <div className="wt-navbar-container">
          <div className="wt-navbar-grid">
            <div className="wt-navbar-grid-col -left">
              <div className="wt-navbar-logo" data-magnetic data-cursor="-normal">
                {/* 로고부분 */}
                <a href="/" aria-label="Wickret">
                  <img src="/img/logo.png" srcSet="/img/logo@2x.png 2x" alt="" />
                </a>
              </div>
            </div>
            {/* 회원가입, 로그인, 서비스 이용 추후에 link나 navigation을 활용하여 페이지 이동하게 할 것 */}
            {/* 로그인이 된 상태라면 상단바의 텍스트들이 달라져야함 마이페이지가 있어야되고 로그인 된 상태에서 try를 누르면 측정
              페이지로, 로그인이 된 상태가 아니라면 try를 누르면 로그인/회원가입 페이지로 이동하게 할 것
            */}
            <div className="wt-navbar-grid-col -right">
              <div className="wt-navbar-nav" role="navigation">
                <a className="wt-navbar-nav-item" href="" data-section-target="join" data-magnetic data-cursor="-scale">
                  <span className="wt-navbar-nav-item-bound">
                    <span data-text="Join">Join</span>
                  </span>
                </a>
                <a className="wt-navbar-nav-item" href="" data-section-target="login" data-magnetic data-cursor="-scale">
                  <span className="wt-navbar-nav-item-bound">
                    <span data-text="Login">Login</span>
                  </span>
                </a>
              </div>
              <div className="wt-navbar-sign">
                <button className="wt-btn wt-btn_sign" data-section-target="try" data-cursor="-default">
                  <span className="wt-btn_sign-bound">
                    <span data-width="#fff" data-text="Try">Try</span>
                  </span>
                </button>
              </div>
              <div className="wt-navbar-toggle">
                <button className="wt-btn wt-btn_menu" aria-label="Menu">
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 화면이 줄어들 때 생기는 메뉴바 */}
      <div className="wt-navbar-menu">
        <div className="wt-navbar-menu-fill"></div>
        <div className="wt-navbar-menu-content">
          <div className="wt-navbar-menu-container">
            <div className="wt-navbar-menu-nav" role="navigation">
              <a className="wt-navbar-menu-nav-item" href="" data-section-target="join">
                <span>Join</span>
              </a>
              <a className="wt-navbar-menu-nav-item" href="" data-section-target="login">
                <span>Login</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header