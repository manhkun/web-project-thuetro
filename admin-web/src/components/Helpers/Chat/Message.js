import React from "react";
import "./Message.css";

export const Message = () => {
  return (
    <div className="message-chat__container">
      <img src="/icons/profile 1.png" alt="" />
      <div className="message-chat__content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        <span>22:32</span>
      </div>
    </div>
  );
};

export const MyMessage = () => {
  return (
    <div className="mymessage-chat__container">
      <div className="mymessage-chat__content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        <span>22:32</span>
      </div>
    </div>
  );
};
