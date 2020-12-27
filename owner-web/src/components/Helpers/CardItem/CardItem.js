import React from "react";
import { Link } from "react-router-dom";
import "./CardItem.css";

function CardItem(props) {
  return (
    <Link to={`room-detail/${props.houseid}`} className="card-item">
      <img src={props.image} alt="" />
      <div className="card-title">{props.title}</div>
      <div className="card-price">{props.price}</div>
      <div className="location-own">{props.location}</div>
      <div className="info">
        <img src="/icons/heart (1).png" alt="" />
        <div className="location-own">{props.like}</div>
      </div>
      <div className="info">
        <img src="/icons/view.png" alt="" />
        <div className="location-own">{props.view}</div>
      </div>
    </Link>
  );
}

export default CardItem;
