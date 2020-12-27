import React from "react";
import { Link } from "react-router-dom";
import "./UserChat.css";

function UserChat(props) {
  return (
    <Link
      to={`/chat/${props.id}/${props.name}`}
      className="user-chat__container"
    >
      <img src="/icons/profile 1.png" alt="" />
      <h4>{props.name}</h4>
      <p className="user-chat__last">Nhấp để nhắn tin</p>
    </Link>
  );
}

export default UserChat;
