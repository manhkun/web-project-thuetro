import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./RoomDetail.css";

import { Button } from "../components/Helpers/Button/Button";
import Modal from "../components/Modal";
import Section from "../components/Section";
import { FormInput } from "../components/Helpers/FormInput/FormInput";
import { Comment } from "../components/Helpers/Comment/Comment";
import { MoreInfoRoom } from "../components/MoreInfoRoom";
import convertTime from "../helper/convertTime";
import { price } from "../helper/convertPrice";
import userApi from "../api/userApi";
import houseApi from "../api/houseApi";

function RoomDetail() {
  const { id } = useParams();

  const [voteActive, setVoteActive] = useState(null);
  const [curImg, setCurImg] = useState(0);
  const [data, setData] = useState({});
  const [owner, setOwner] = useState({});
  const [loading, setLoading] = useState(false);
  const [listComment, setListComment] = useState([]);
  const [isOpenModalDeny, setIsOpenModalDeny] = useState(false);
  const [reason, setReason] = useState("");

  const handleDeny = async () => {
    let res = await houseApi.denyHouse(id, reason);
    if (res.code === 200) window.location.reload();
  };

  const typeHouse = [
    "Phòng trọ",
    "Chung cư mini",
    "Nhà nguyên căn",
    "Chung cư",
  ];

  useEffect(() => {
    const fetchData = async () => {
      let house = await houseApi.getInfoHouse(id);
      setData(house.data);
      try {
        let owner = await userApi.getInfoOwner(house.data.owner_id);
        setOwner(owner.data);
      } catch (error) {
        console.log(error);
      }
      let cmt = await houseApi.getListComment(id);
      setListComment(cmt.data);
      setLoading(true);
    };
    fetchData();
  }, [id]);
  const handleCurImg = (e, act) => {
    e.preventDefault();
    switch (act) {
      case "NEXT":
        {
          if (curImg < data.image_link.length - 1) {
            setCurImg(curImg + 1);
          } else {
            setCurImg(data.image_link.length - 1);
          }
        }
        break;
      case "PREVIOUS":
        {
          if (curImg > 0) {
            setCurImg(curImg - 1);
          } else {
            setCurImg(0);
          }
        }
        break;
    }
  };
  if (!loading) {
    return <p>Loading</p>;
  }
  return (
    <div className="room-detail">
      <Section>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3>NHÀ TRỌ GIÁ RẺ</h3>
        </div>
      </Section>
      <div className="room-detail-container">
        <div className="room-info">
          <Section sectionSize="section--large">
            <div className="image-room">
              <div
                className="image-previous-btn"
                onClick={(e) => handleCurImg(e, "PREVIOUS")}
              >
                <img src="/icons/play-button.png" alt="" />
              </div>
              <img
                src={data.image_link[curImg]}
                className="image-room-item"
                alt=""
              />
              <div
                className="image-next-btn"
                onClick={(e) => handleCurImg(e, "NEXT")}
              >
                <img src="/icons/play-button.png" alt="" />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <h3 className="title-room">{data.header}</h3>
            </div>
            <h3 className="price">{price}</h3>
            <div className="profile-responsive">
              <div className="profile">
                <img src="/icons/profile 1.png" alt="" />
                <h4>{owner ? owner.owner_full_name : "Admin"}</h4>
              </div>
              {owner ? (
                <Link to={`/profile/${owner.owner_name}`}>Xem trang</Link>
              ) : (
                ""
              )}
            </div>
            <MoreInfoRoom
              src="/icons/clock 1.png"
              content={`Thời gian đăng: ${convertTime(data.post_time)}`}
            />
            <MoreInfoRoom
              src="/icons/charging-circle 1.png"
              content={`Tình trạng: ${
                data.rented ? "Đã cho thuê" : "Chưa cho thuê"
              }`}
            />
            <div className="location-room">
              <img src="/icons/pin 1.png" alt="" />
              <p>{`${data.address.commune}, ${data.address.district}, ${data.address.province}`}</p>
            </div>

            <p>{data.content}</p>
            <div className="more-info-container">
              <MoreInfoRoom
                src="/icons/home (1).png"
                content={`Loại phòng: ${typeHouse[data.house_type]}`}
              ></MoreInfoRoom>
              <MoreInfoRoom
                src="/icons/padlock 1.png"
                content={`Tiền cọc: ${data.pre_order}Đ`}
              />
              <MoreInfoRoom
                src="/icons/area 1.png"
                content={`Diện tích: ${data.surface}m`}
              />
              <MoreInfoRoom
                src="/icons/air-conditioner (1) 1.png"
                content={`Điều hoà: ${
                  data.infrastructure.air_condition ? "Có" : "Không"
                }`}
              />
              <MoreInfoRoom
                src="/icons/water-heater.png"
                content={`Nóng lạnh: ${
                  data.infrastructure.heater ? "Có" : "Không"
                }`}
              />
              <MoreInfoRoom
                src="/icons/plug.png"
                content={`Giá điện: ${data.infrastructure.electric_price}Đ/số`}
              />
              <MoreInfoRoom
                src="/icons/water-drop.png"
                content={`Giá nước: ${data.infrastructure.water_price}Đ/khối`}
              />
              <MoreInfoRoom
                src="/icons/room.png"
                content={`Số phòng: ${data.infrastructure.number_of_room} phòng`}
              />
              <MoreInfoRoom
                src="/icons/kitchen.png"
                content={`Nhà bếp: ${
                  data.infrastructure.kitchen ? "Có" : "Không"
                }`}
              />
              <MoreInfoRoom
                src="/icons/landlord.png"
                content={`Chung chủ: ${data.with_owner ? "Có" : "Không"}`}
              />
              <MoreInfoRoom
                src="/icons/clipboards.png"
                content={`Khác: ${data.infrastructure.other}`}
              />
              <MoreInfoRoom
                src="/icons/village.png"
                content={`Gần: ${data.near_by.toString()}`}
              />
            </div>
          </Section>
        </div>
        <div className="renter-info">
          <Section sectionSize="section--large">
            <div className="info-renter">
              <div className="profile">
                <img src="/icons/profile 1.png" alt="" />
                <p>{owner ? owner.owner_full_name : "Admin"}</p>
              </div>
              <div className="center" style={{ marginTop: "10px" }}>
                {owner ? (
                  <Link
                    to={`/profile/${owner.owner_name}`}
                    style={{ width: "100%" }}
                  >
                    <Button buttonSize="btn--xlarge">
                      <img src="/icons/user (1) 1.png" alt="" />
                      <p>Xem trang cá nhân</p>
                    </Button>
                  </Link>
                ) : (
                  ""
                )}
              </div>
              <div className="center">
                <div className="rate">
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                  <i className="fa fa-star" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
      <div className="voted-container">
        <Section sectionSize="section--large" title="ĐÁNH GIÁ & BÁO CÁO">
          <div className="voted">
            <div className="percent-voted">
              <p>5 trên 5</p>
              <div className="list-star">
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
              </div>
            </div>
            <div className="star-voted">
              <button
                className={!voteActive && "active"}
                onClick={() => setVoteActive(null)}
              >
                Tất cả
              </button>
              <button
                className={voteActive === 5 ? "active" : ""}
                onClick={() => setVoteActive(5)}
              >
                5 <i className="fa fa-star" aria-hidden="true"></i>
              </button>
              <button
                className={voteActive === 4 ? "active" : ""}
                onClick={() => setVoteActive(4)}
              >
                4 <i className="fa fa-star" aria-hidden="true"></i>
              </button>
              <button
                className={voteActive === 3 ? "active" : ""}
                onClick={() => setVoteActive(3)}
              >
                3 <i className="fa fa-star" aria-hidden="true"></i>
              </button>
              <button
                className={voteActive === 2 ? "active" : ""}
                onClick={() => setVoteActive(2)}
              >
                2 <i className="fa fa-star" aria-hidden="true"></i>
              </button>
              <button
                className={voteActive === 1 ? "active" : ""}
                onClick={() => setVoteActive(1)}
              >
                1 <i className="fa fa-star" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          {!voteActive
            ? listComment.map((item, key) => {
                return <Comment data={item} key={key} />;
              })
            : listComment
                .filter((item) => item.star === voteActive)
                .map((item, key) => {
                  return <Comment data={item} key={key} />;
                })}
          <div className="center">
            <Modal
              open={isOpenModalDeny}
              onClose={() => setIsOpenModalDeny(false)}
              onClick={handleDeny}
            >
              Bạn có muốn khoá bài viết này ?
              <FormInput
                placeholder="Lý do"
                onChange={(e) => setReason(e.target.value)}
              ></FormInput>
            </Modal>
            <div style={{ margin: "10px" }}>
              <Button
                buttonStyle="btn--yellow"
                onClick={() => setIsOpenModalDeny(true)}
              >
                <p>KHOÁ BÀI ĐĂNG</p>
              </Button>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

export default RoomDetail;
