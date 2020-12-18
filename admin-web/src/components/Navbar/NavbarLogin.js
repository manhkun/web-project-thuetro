import React from "react";
import { Button } from "../Helpers/Button/Button";
import { Link } from "react-router-dom";

import "./Navbar.css";

function NavbarLogin() {
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
                <Link className="btn-noti">
                  <img src="icons/bell 1.png" alt="" />
                  <p>Thông báo</p>
                </Link>
              </li>
            </ul>
            <LoginBtn />
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
              <Button buttonStyle="btn--primary" buttonSize="btn--medium">
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
      <img src="icons/user 1.png" alt="" />
      <p>Đăng nhập</p>
    </Link>
  );
}

export default NavbarLogin;
