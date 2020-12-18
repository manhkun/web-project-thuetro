import React from "react";
import "./MoreInfoRoom.css";

export const MoreInfoRoom = ({ src, content }) => {
  return (
    <div className="info-room-item">
      <img src={src} alt="" />
      <p>{content}</p>
    </div>
  );
};
