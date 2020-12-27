import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";
import { Button } from "../../Helpers/Button/Button";

function NavbarOwner() {
  const [clickAccount, setClickAccount] = useState(false);
  const handleAccountClick = () => setClickAccount(!clickAccount);
  const handleLogOut = () => {
    sessionStorage.clear();
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="status-bar">
            <Link to="/" className="navbar-logo">
              <img src="/icons/home (1) 1.png" alt="" />
            </Link>
            <ul>
              <li>
                <Link to="/">
                  <img src="/icons/home 1.png" alt="" />
                  <p>Trang chủ</p>
                </Link>
              </li>
              <li>
                <Link to="/post-manage">
                  <img src="/icons/house 1.png" alt="" />
                  <p>Tôi cho thuê</p>
                </Link>
              </li>
              <li>
                <Link to="/chat">
                  <img src="/icons/message.png" alt="" />
                  <p>Tin nhắn</p>
                </Link>
              </li>
            </ul>
            <UserBtn
              name="Admin"
              handleAccountClick={handleAccountClick}
              clickAccount={clickAccount}
              handleLogOut={handleLogOut}
            />
          </div>
          <div className="search-post">
            <div className="search-input">
              <form action="">
                <input type="text" placeholder="Tìm kiếm..." />
                <button type="submit">
                  <img src="/icons/loupe 1.png" alt="" />
                </button>
              </form>
            </div>
            <div className="post">
              <Button
                buttonStyle="btn--primary"
                buttonSize="btn--medium"
                link="/post"
              >
                <img src="/icons/sticky-notes 1.png" alt="" />
                <p>ĐĂNG TIN</p>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
function UserBtn(props) {
  return (
    <div className="account-button">
      <div className="user" onClick={props.handleAccountClick}>
        <img src="/icons/user 1.png" alt="" />
        <p>{props.name}</p>
      </div>
      <div
        className={
          props.clickAccount ? "account-container" : "account-container hidden"
        }
      >
        <div className="view-profile-alert" onClick={props.handleAccountClick}>
          <img src="/icons/profile 1.png" alt="" />
          <h3>{props.name}</h3>
          <p>Người quản lý</p>
        </div>
        <div className="save-post-alert" onClick={props.handleAccountClick}>
          <img src="/icons/user.png" alt="" />
          <Link to="/user-manage">Quản lý tài khoản</Link>
        </div>
        <div className="save-post-alert" onClick={props.handleAccountClick}>
          <img src="/icons/post 1.png" alt="" />
          <Link to="/post-manage">Quản lý bài đăng</Link>
        </div>
        <div className="save-post-alert" onClick={props.handleAccountClick}>
          <img src="/icons/bar-chart (1).png" alt="" />
          <Link to="/statistic">Thống kê</Link>
        </div>
        <div className="logout" onClick={props.handleLogOut}>
          <img src="/icons/logout.png" alt="" />
          <div>Đăng xuất</div>
        </div>
      </div>
    </div>
  );
}

export default NavbarOwner;
