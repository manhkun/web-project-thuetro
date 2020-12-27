import React from "react";
import "./Message.css";
import convertTime from "../../../helper/convertTime";

export const Message = ({ content, time }) => {
  return (
    <div className="message-chat__container">
      <img src="/icons/profile 1.png" alt="" />
      <div className="message-chat__content">
        {content}
        <span className="message-chat__time">{convertTime(time)}</span>
      </div>
    </div>
  );
};

export const MyMessage = ({ content, time }) => {
  return (
    <div className="mymessage-chat__container">
      <div className="mymessage-chat__content">
        {content}
        <span className="message-chat__time">{convertTime(time)}</span>
      </div>
    </div>
  );
};
