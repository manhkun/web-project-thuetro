import React, { useState } from "react";
import "./UserItem.css";
import Modal from "../Modal";
import userApi from "../../api/userApi";

const Item = ({ src, content }) => {
  return (
    <div className="item-container">
      <img src={src} alt="" />
      <p>{content}</p>
    </div>
  );
};

const OptionItem = ({ src, content, onClick }) => {
  return (
    <div className="option-item__container">
      <div className="option-item" onClick={onClick}>
        <img src={src} alt="" />
        <h3>{content}</h3>
      </div>
    </div>
  );
};

export const UserPending = (props) => {
  const handleAccept = async () => {
    let res = await userApi.activeOwner(props.username);
    if (res.code === 200) window.location.reload();
  };

  const handleDeny = async () => {
    let res = await userApi.deleteOwner(props.username);
    if (res.code === 200) window.location.reload();
  };
  const [isOpenModalAccept, setIsOpenModalAccept] = useState(false);
  const [isOpenModalDeny, setIsOpenModalDeny] = useState(false);
  return (
    <div>
      <Modal
        open={isOpenModalAccept}
        onClose={() => setIsOpenModalAccept(false)}
        onClick={handleAccept}
      >
        Bạn có muốn xét duyệt tài khoản này ?
      </Modal>
      <Modal
        open={isOpenModalDeny}
        onClose={() => setIsOpenModalDeny(false)}
        onClick={handleDeny}
      >
        Bạn có muốn từ chối tài khoản này ?
      </Modal>
      <div className="user-item__container">
        <img src="/icons/profile 1.png" alt="" />
        <div className="item-container__grid">
          <Item src="/icons/user.png" content={props.name} />
          <Item src="/icons/ID_card.png" content={props.id_card} />
          <Item src="/icons/pin 1.png" content={props.location} />
          <Item src="/icons/phone 1.png" content={props.phone} />
          <Item src="/icons/Email.png" content={props.email} />
        </div>
      </div>
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
            onClick={props.handleDeny}
          />
        </div>
      </div>
    </div>
  );
};

export const UserActive = (props) => {
  return (
    <div>
      <div className="user-item__container">
        <img src="/icons/profile 1.png" alt="" />
        <div className="item-container__grid">
          <Item src="/icons/user.png" content={props.name} />
          <Item src="/icons/ID_card.png" content={props.id_card} />
          <Item src="/icons/pin 1.png" content={props.location} />
          <Item src="/icons/phone 1.png" content={props.phone} />
          <Item src="/icons/Email.png" content={props.email} />
          <Item src="/icons/post 1.png" content={props.post_num} />
          <Item src="/icons/evaluate (1).png" content={props.evaluate} />
          <Item src="/icons/clock 1.png" content={props.create_at} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div className="option-btn__1">
          <OptionItem
            src="/icons/plus 2.png"
            content="Khoá tài khoản"
            onClick={props.handleBlock}
          />
        </div>
      </div>
    </div>
  );
};

export const UserBlocked = (props) => {
  return (
    <div>
      <div className="user-item__container">
        <img src="/icons/profile 1.png" alt="" />
        <div className="item-container__grid">
          <Item src="/icons/user.png" content={props.name} />
          <Item src="/icons/ID_card.png" content={props.id_card} />
          <Item src="/icons/pin 1.png" content={props.location} />
          <Item src="/icons/phone 1.png" content={props.phone} />
          <Item src="/icons/Email.png" content={props.email} />
          <Item src="/icons/comment.png" content={props.reason} />
        </div>
      </div>
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
            content="Khôi phục tài khoản"
            onClick={props.handleRestore}
          />
        </div>
      </div>
    </div>
  );
};
