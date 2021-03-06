import React, { useState } from "react";
import { Link } from "react-router-dom";
import houseApi from "../../api/houseApi";
import Modal from "../Modal";
import { FormInput } from "../Helpers/FormInput/FormInput";
import "./PostItem.css";
import { price } from "../../helper/convertPrice";
import convertTime from "../../helper/convertTime";

const OptionItem = ({ src, content, onClick }) => {
  return (
    <div className="option-item__container">
      <div className="option-item" onClick={onClick}>
        <img src={src} alt="" />
        <h4 style={{ color: "#000" }}>{content}</h4>
      </div>
    </div>
  );
};

export const PostedItem = ({ data }) => {
  const [isOpenModalRented, setIsOpenModalRented] = useState(false);
  const [isOpenModalExperied, setIsOpenModalExperied] = useState(false);
  const [timeExpired, setTimeExpired] = useState(0);

  const handleRented = async () => {
    let res = await houseApi.updateRentedHouse(data.house_id);
    if (res.code === 200) window.location.reload();
  };

  const handleExpired = async () => {
    let res = await houseApi.expiredHouse(data.house_id, timeExpired);
    console.log(res);
  };
  return (
    <div>
      <Modal
        open={isOpenModalRented}
        onClose={() => setIsOpenModalRented(false)}
        onClick={handleRented}
      >
        Bạn có muốn xoá tin này ?
      </Modal>
      <Modal
        open={isOpenModalExperied}
        onClose={() => setIsOpenModalExperied(false)}
        onClick={handleExpired}
      >
        <FormInput
          placeholder="Lý do"
          onChange={(e) => setTimeExpired(e.target.value)}
        ></FormInput>
        Bạn có muốn gia hạn tin này ?
      </Modal>
      <Link className="info-posted" to={`/room-detail/${data.house_id}`}>
        <img src={data.image_link[0]} alt="" />
        <div className="info-posted-detail">
          <p>{data.header}</p>
          <h3>{price(data)}</h3>
          <div className="time">
            <img src="/icons/clock 1.png" alt="" />
            <p>{convertTime(data.post_time)}</p>
          </div>
          <div className="location">
            <img src="/icons/pin 1.png" alt="" />
            <p>{`${data.address.street}, ${data.address.commune}, ${data.address.district}, ${data.address.province}`}</p>
          </div>
          <div className="time">
            <img src="/icons/queue.png" alt="" />
            <p>{convertTime(data.expired_time)}</p>
          </div>
        </div>
      </Link>
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
            onClick={() => setIsOpenModalRented(true)}
          />
        </div>
        <div className="option-btn__2">
          <OptionItem
            src="/icons/plus 1.png"
            content="Gia hạn"
            onClick={() => setIsOpenModalExperied(true)}
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

export const PostDeniedItem = (props) => {
  return (
    <div>
      <div className="info-denied">
        <img src={props.img} alt="" />
        <div className="info-denied-detail">
          <p>{props.title}</p>
          <div className="noti-denied">
            <img src="/icons/triangle 1.png" alt="" />
            <h3>Lý do: {props.reason}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PostPendingItem = (props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleDelete = async (e) => {
    e.preventDefault();
    let token = sessionStorage.getItem("tokenOwner");
    let res = await houseApi.deleteHouse(props.id, token);
    if (res.code === 200) {
      setIsOpenModal(false);
      window.location.reload();
    }
  };
  return (
    <div>
      <Modal
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onClick={handleDelete}
      >
        Bạn có muốn xoá tin này ?
      </Modal>
      <div className="info-pending">
        <img src={props.img} alt="" />
        <div className="info-pending-detail">
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
            src="/icons/delete.png"
            content="Xoá"
            onClick={() => setIsOpenModal(true)}
          />
        </div>
        <div className="option-btn__2">
          <Link to={`/post/${props.id}`}>
            <OptionItem
              src="/icons/edit.png"
              content="Chỉnh sửa"
              onClick={props.handleBlock}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
