import React from 'react'
import { Link } from 'react-router-dom'
import instance from '../axios';

const Header = ({ user, setUser }) => {

  // sessionStorage에서 직접 로그인 상태 확인
  const isLoggedIn = () => {
    const sessionInfo = sessionStorage.getItem("info");
    if (sessionInfo) {
      const info = JSON.parse(sessionInfo);
      return info.auth === "user" && info.user_id;
    }
    return false;
  }

  // 로그아웃 함수
  const logout = async () => {
    console.log("로그아웃 함수");
    const res = await instance.get("/logout");
    console.log("logout res :", res.data);

    // sessionStorage 값 지우기
    sessionStorage.removeItem("info");

    setUser("");
    alert("다음에 또 방문해주세요 ~!");
    window.location.href = '/';
  }

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
            <div className="wt-navbar-grid-col -right">
              <div className="wt-navbar-nav" role="navigation">
                {!isLoggedIn() ? (
                  <Link
                    to="/join"
                    className="wt-navbar-nav-item router-link"
                    data-magnetic
                    data-cursor="-scale"
                  >
                    <span className="wt-navbar-nav-item-bound">
                      <span data-text="Join">Join</span>
                    </span>
                  </Link>
                ) : (
                  <Link
                    to="/mypage"
                    className="wt-navbar-nav-item router-link"
                    data-magnetic
                    data-cursor="-scale"
                  >
                    <span className="wt-navbar-nav-item-bound">
                      <span data-text="Mypage">Mypage</span>
                    </span>
                  </Link>
                )}
                {!isLoggedIn() ? (
                  <Link
                    to="/login"
                    className="wt-navbar-nav-item router-link"
                    data-magnetic
                    data-cursor="-scale"
                  >
                    <span className="wt-navbar-nav-item-bound">
                      <span data-text="Login">Login</span>
                    </span>
                  </Link>
                ) : (
                  <button
                    className="wt-navbar-nav-item router-link nav-button"
                    onClick={logout}
                    data-magnetic
                    data-cursor="-scale"
                  >
                    <span className="wt-navbar-nav-item-bound">
                      <span data-text="Logout">Logout</span>
                    </span>
                  </button>
                )}
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