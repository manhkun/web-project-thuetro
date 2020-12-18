import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import houseApi from "../../api/houseApi";
import { FormInput } from "../FormInput";
import "./PostItem.css";

const OptionItem = ({ src, content, onClick }) => {
  return (
    <div className="option-item__container">
      <div className="option-item" onClick={onClick}>
        <img src={src} alt="" />
        <h4>{content}</h4>
      </div>
    </div>
  );
};

const Item = ({ src, content }) => {
  return (
    <div className="item-container">
      <img src={src} alt="" />
      <p>{content}</p>
    </div>
  );
};

const ItemPost = ({
  src,
  title,
  price,
  create_at,
  location,
  expired,
  reason,
}) => {
  return (
    <div className="post-item__container">
      <img src={src} alt="" />
      <div className="post-item__item">
        <h4>{title}</h4>
        <h3 style={{ color: "red", fontSize: "1.4rem" }}>{price}</h3>
        <Item src="/icons/clock 1.png" content={create_at} />
        <Item src="/icons/pin 1.png" content={location} />

        {reason && (
          <Item
            src="/icons/triangle 1.png"
            content={<h4 style={{ color: "red" }}>Lý do: {reason}</h4>}
          ></Item>
        )}
      </div>
    </div>
  );
};

export const PostedItem = (props) => {
  return (
    <div>
      <ItemPost
        src={props.img}
        title={props.title}
        price={props.price}
        create_at={props.create_at}
        location={props.location}
        expired={props.expired}
      />
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div className="option-btn__2">
          <OptionItem
            src="/icons/private 1.png"
            content="Đã cho thuê"
            onClick={props.handleBlock}
          />
        </div>
        <div className="option-btn__2">
          <OptionItem
            src="/icons/plus 2.png"
            content="Xoá"
            onClick={props.handleBlock}
          />
        </div>
      </div>
    </div>
  );
};

export const PostItem = (props) => {
  return (
    <div>
      <Link className="info-posted" to={`/room-detail/${props.id}`}>
        <img src={props.img} alt="" />
        <div className="info-posted-detail">
          <p>{props.title}</p>
          <h3>{props.price}</h3>
          <div className="time">
            <img src="/icons/clock 1.png" alt="" />
            <p>{props.time}</p>
          </div>
          <div className="location">
            <img src="/icons/pin 1.png" alt="" />
            <p>{props.location}</p>
          </div>
          <div className="time">
            <img src="/icons/queue.png" alt="" />
            <p>{props.expired}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export const PostPendingItem = (props) => {
  const [isOpenModalAccept, setIsOpenModalAccept] = useState(false);
  const [isOpenModalDeny, setIsOpenModalDeny] = useState(false);
  const [reason, setReason] = useState("");

  const handleAccept = async () => {
    let res = await houseApi.acceptHouse(props.houseid);
    if (res.code === 200) window.location.reload();
  };

  const handleDeny = async () => {
    let res = await houseApi.denyHouse(props.houseid, reason);
    if (res.code === 200) window.location.reload();
  };
  return (
    <div>
      <Modal
        open={isOpenModalAccept}
        onClose={() => setIsOpenModalAccept(false)}
        onClick={handleAccept}
      >
        Bạn có muốn xét duyệt bài viết này ?
      </Modal>
      <Modal
        open={isOpenModalDeny}
        onClose={() => setIsOpenModalDeny(false)}
        onClick={handleDeny}
      >
        Bạn có muốn từ chối bài viết này ?
        <FormInput
          placeholder="Lý do"
          onChange={(e) => setReason(e.target.value)}
        ></FormInput>
      </Modal>
      <ItemPost
        src={props.img}
        title={props.title}
        price={props.price}
        create_at={props.create_at}
        location={props.location}
        expired={props.expired}
      />
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div className="option-btn__2">
          <OptionItem
            src="/icons/Vector.png"
            content="Phê duyệt"
            onClick={() => setIsOpenModalAccept(true)}
          />
        </div>
        <div className="option-btn__2">
          <OptionItem
            src="/icons/plus 2.png"
            content="Từ chối"
            onClick={() => setIsOpenModalDeny(true)}
          />
        </div>
      </div>
    </div>
  );
};

export const PostDeniedItem = (props) => {
  const [isOpenModalRestore, setIsOpenModalRestore] = useState(false);
  const handleRestore = async () => {
    let res = await houseApi.acceptHouse(props.houseid);
    if (res.code === 200) window.location.reload();
  };
  return (
    <div>
      <Modal
        open={isOpenModalRestore}
        onClose={() => setIsOpenModalRestore(false)}
        onClick={handleRestore}
      >
        Bạn có muốn khôi phục bài viết này ?
      </Modal>
      <ItemPost
        src={props.img}
        title={props.title}
        price={props.price}
        create_at={props.create_at}
        location={props.location}
        expired={props.expired}
        reason={props.reason}
      />
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div className="option-btn__1">
          <OptionItem
            src="/icons/restore.png"
            content="Khôi phục"
            onClick={() => setIsOpenModalRestore(true)}
          />
        </div>
      </div>
    </div>
  );
};
