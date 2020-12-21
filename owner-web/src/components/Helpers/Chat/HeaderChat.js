import React from "react";
import "./HeaderChat.css";

function HeaderChat() {
  return (
    <div className="header-chat__container">
      <div className="header-chat__user">
        <img src="/icons/profile 1.png" alt="" />
        <h3 className="header-chat__name">Phùng Mạnh</h3>
      </div>
      <img src="/icons/info.png" alt="" />
    </div>
  );
}

export default HeaderChat;
