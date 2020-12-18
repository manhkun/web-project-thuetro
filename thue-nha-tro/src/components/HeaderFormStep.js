import React from "react";
import "./HeaderFormStep.css";

export const HeaderFormStep = ({ title, onClick, percent }) => {
  return (
    <div className={`header--form--step ${percent}`}>
      <img src="/icons/play-button.png" alt="" id="back--btn" onClick={onClick} />
      <h3>{title}</h3>
    </div>
  );
};
