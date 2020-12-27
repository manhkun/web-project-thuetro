import React from "react";
import { Link } from "react-router-dom";
import "./HeaderChat.css";

function HeaderChat(props) {
  return (
    <div className="header-chat__container">
      <div className="header-chat__user">
        <img src="/icons/profile 1.png" alt="" />
        <h3 className="header-chat__name">{props.name}</h3>
      </div>
      <Link to={`/profile/${props.id}`}>
        <img
          className="header-chat__info"
          src="/icons/info.png"
          alt=""
          alt=""
        />
      </Link>
    </div>
  );
}

export default HeaderChat;
