import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./Navbar.css";
import { logout } from "../actions/user";

function Navbar({currentUser}) {
  const [clickNoti, setClickNoti] = useState(false);
  const [clickAccount, setClickAccount] = useState(false);
  const handleNotiClick = () => setClickNoti(!clickNoti);
  const handleAccountClick = () => setClickAccount(!clickAccount);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    sessionStorage.clear();
    console.log("alo");
    dispatch(logout());
}

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="status-bar">
            <Link to="/" className="navbar-logo">
              <img src="icons/home (1) 1.png" alt="" />
            </Link>
              <ul>
                <li>
                  <Link>
                    <img src="icons/home 1.png" alt="" />
                    <p>Trang chủ</p>
                  </Link>
                </li>
                <li>
                  <Link>
                    <img src="icons/house 1.png" alt="" />
                    <p>Tin đã lưu</p>
                  </Link>
                </li>
                <li>
                  <Link className="btn-noti" onClick={handleNotiClick}>
                    <img src="icons/bell 1.png" alt="" />
                    <p>Thông báo</p>
                  </Link>
                  <div
                    className={
                      clickNoti ? "noti-container" : "noti-container hidden"
                    }
                  >
                    <h3>THÔNG BÁO</h3>
                    <div className="noti-item">
                      <img src="image/nhatro.jpg" alt="" />
                      <p>
                        Tin <strong>Nhà trọ giá rẻ</strong> đã được duyệt thành
                        công
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            {currentUser.renter_full_name ? (
              <UserBtn
                name={currentUser.renter_full_name}
                handleAccountClick={handleAccountClick}
                clickAccount={clickAccount}
                handleLogOut={handleLogOut}
              />
            ) : (
              <LoginBtn />
            )}
          </div>
          <div className="search-post">
            <div className="search-input" style={{width: "100%"}}>
              <form action="">
                <input type="text" placeholder="Tìm kiếm..." />
                <button type="submit">
                  <img src="/icons/loupe 1.png" alt="" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

function LoginBtn() {
  return (
    <Link to="/login" className="user">
      <img src="icons/user 1.png" alt="" />
      <p>Đăng nhập</p>
    </Link>
  );
}

function UserBtn(props) {
  return (
    <div className="account-button">
      <div className="user" onClick={props.handleAccountClick}>
        <img src="icons/user 1.png" alt="" />
        <p>{props.name}</p>
      </div>
      <div
        className={
          props.clickAccount ? "account-container" : "account-container hidden"
        }
      >
        <div className="view-profile-alert" onClick={props.handleAccountClick}>
          <img src="icons/profile 1.png" alt="" />
          <h3>{props.name}</h3>
          <Link to="/profile">Xem trang cá nhân</Link>
        </div>
        <div className="save-post-alert" onClick={props.handleAccountClick}>
          <img src="icons/heart.png" alt="" />
          <a href="">Tin đã lưu</a>
        </div>
        <div className="logout" onClick={props.handleLogOut}>
          <img src="icons/logout.png" alt="" />
          <Link to="/">Đăng xuất</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
