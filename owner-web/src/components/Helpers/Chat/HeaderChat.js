import React from "react";
import "./HeaderChat.css";

function HeaderChat() {
  return (
    <div className="header-chat__container">
      <div className="header-chat__user">
        <img src="/icons/profile 1.png" alt="" />
        <h3 className="header-chat__name">Admin</h3>
      </div>
    </div>
  );
}

export default HeaderChat;
