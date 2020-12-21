import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./Navbar.css";
import { Button } from "./Button";
import { logout } from "../actions/user";
import userApi from "../api/userApi";

function NavbarOwner({ currentUser }) {
  const [clickNoti, setClickNoti] = useState(false);
  const [clickAccount, setClickAccount] = useState(false);
  const [dataNoti, setDataNoti] = useState([]);

  const ws = new WebSocket("ws://localhost:9999/v1/rent-house/notification");

  const handleNotiClick = async () => {
    setClickNoti(!clickNoti);
    if (!clickNoti) {
      let res = await userApi.getNotification();
      setDataNoti(res.data);
    }
  };
  const handleAccountClick = () => setClickAccount(!clickAccount);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    sessionStorage.clear();
    dispatch(logout());
  };

  useEffect(() => {
    ws.onopen = () => {
      console.log("Connected");
      ws.send(sessionStorage.getItem("tokenOwner"));
    };
    ws.onmessage = (evt) => {
      const message = JSON.parse(evt.data);
      console.log(message);
    };
  }, []);

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
              <li>
                <div className="btn-noti" onClick={handleNotiClick}>
                  <img src="/icons/bell 1.png" alt="" />
                  <p>Thông báo</p>
                </div>
                <div
                  className={
                    clickNoti ? "noti-container" : "noti-container hidden"
                  }
                >
                  <h3>THÔNG BÁO</h3>
                  {dataNoti.map((item) => {
                    return (
                      <NotiItem
                        src={item.house.image_link[0]}
                        title={item.house.header}
                        type={item.type}
                        houseid={item.house.house_id}
                      />
                    );
                  })}
                </div>
              </li>
            </ul>
            {currentUser ? (
              <UserBtn
                name={currentUser.owner_full_name}
                handleAccountClick={handleAccountClick}
                clickAccount={clickAccount}
                handleLogOut={handleLogOut}
                id={currentUser.owner_name}
              />
            ) : (
              <LoginBtn />
            )}
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

function LoginBtn() {
  return (
    <Link to="/login" className="user">
      <img src="/icons/user 1.png" alt="" />
      <p>Đăng nhập</p>
    </Link>
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
          <Link to={`/profile/${props.id}`}>Xem trang cá nhân</Link>
        </div>
        <div className="logout" onClick={props.handleLogOut}>
          <img src="/icons/logout.png" alt="" />
          <div>Đăng xuất</div>
        </div>
      </div>
    </div>
  );
}

function NotiItem(props) {
  return (
    <Link to={`/room-detail/${props.houseid}`} className="noti-item">
      <img src={props.src} alt="" />
      <p>
        Tin <strong>{props.title}</strong> đã được duyệt thành công
      </p>
    </Link>
  );
}

export default NavbarOwner;
