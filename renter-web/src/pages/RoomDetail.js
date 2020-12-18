import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./RoomDetail.css";

import { Button } from "../components/Button";
import Section from "../components/Section";
import { FormInput } from "../components/FormInput";
import { Comment } from "../components/Comment";
import { MoreInfoRoom } from "../components/MoreInfoRoom";
import convertTime from "../helper/convertTime";
import userApi from "../api/userApi";
import houseApi from "../api/houseApi";

function RoomDetail() {
  const { id } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [voteActive, setVoteActive] = useState(5);
  const [curImg, setCurImg] = useState(0);
  const [data, setData] = useState({});
  const [owner, setOwner] = useState({});
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [notiComment, setNotiComment] = useState("");
  const [saved, setSaved] = useState(false);
  const [listComment, setListComment] = useState([]);

  const typeHouse = [
    "Phòng trọ",
    "Chung cư mini",
    "Nhà nguyên căn",
    "Chung cư",
  ];

  useEffect(async () => {
    let house = await houseApi.getInfoHouse(id);
    setData(house.data);
    let owner = await userApi.getInfoOwner(house.data.owner_id);
    setOwner(owner.data);
    if (sessionStorage.getItem("tokenRenter"))
      setSaved(currentUser.list_favourite.indexOf(id) !== -1);
    let cmt = await houseApi.getListComment(id);
    setListComment(cmt.data);
    setLoading(true);
  }, [id]);

  let price = "";
  if (loading) {
    switch (data.unit) {
      case 0:
        price = data.price + "Đ/Tháng";
        break;
      case 1:
        price = data.price * 3 + "Đ/Quý";
        break;
      case 2:
        price = data.price * 12 + "Đ/Năm";
        break;
    }
  }
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
  const handleComment = async (e) => {
    e.preventDefault();
    let res = await houseApi.commentHouse(id, comment, rating);
    if (res.code === 200)
      setNotiComment("Bình luận thành công! Đợi quản trị viên xét duyệt.");
    else setNotiComment("Bình luận bị lỗi, vui lòng thử lại!");
  };

  const handleLikeHouse = async (e) => {
    e.preventDefault();
    let res = await houseApi.likeHouse(data.house_id);
    if (res.code === 200) setSaved(true);
  };
  if (!loading) {
    return <p>Loading</p>;
  }
  return (
    <div className="room-detail">
      <Section>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="back">
            <img src="/icons/play-button.png" alt="" />
            <p>Trở lại</p>
          </div>
          <h3>NHÀ TRỌ GIÁ RẺ</h3>
          <div className="next">
            <p>Tin tiếp</p>
            <img src="/icons/play-button.png" alt="" />
          </div>
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
              <Button onClick={handleLikeHouse}>
                <img
                  src={saved ? "/icons/checked 1.png" : "/icons/heart 1.png"}
                  alt=""
                />
                <p>{saved ? "Đã lưu" : "Lưu tin"}</p>
              </Button>
            </div>
            <h3 className="price">{price}</h3>
            <div className="profile-responsive">
              <div className="profile">
                <img src="/icons/profile 1.png" alt="" />
                <h4>{owner.owner_full_name}</h4>
              </div>
              <Link to="">Xem trang</Link>
            </div>
            <MoreInfoRoom
              src="/icons/clock 1.png"
              content={`Thời gian đăng: ${convertTime(data.post_time)}`}
            />
            <div className="location-room">
              <img src="/icons/pin 1.png" alt="" />
              <p>{`${data.address.commune}, ${data.address.district}, ${data.address.province}`}</p>
            </div>

            <p>{data.content}</p>
            <div class="more-info-container">
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
                src="/icons/bed 1.png"
                content="Tiền cọc: 1.000.000đ"
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
                <p>{owner.owner_full_name}</p>
              </div>
              <div className="center" style={{ marginTop: "10px" }}>
                <Link
                  to={`/profile/${owner.owner_name}`}
                  style={{ width: "100%" }}
                >
                  <Button buttonSize="btn--xlarge">
                    <img src="/icons/user (1) 1.png" alt="" />
                    <p>Xem trang cá nhân</p>
                  </Button>
                </Link>
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
            ? listComment.map((item) => {
                return <Comment data={item} />;
              })
            : listComment
                .filter((item) => item.star === voteActive)
                .map((item) => {
                  return <Comment data={item} />;
                })}
          <form action="" onSubmit={handleComment}>
            <FormInput
              typeInput="textaria"
              rows="5"
              placeholder="Viết nhận xét..."
              minLength="10"
              onChange={(e) => setComment(e.target.value)}
            ></FormInput>
            <div className="center">
              <div>
                {[...Array(5)].map((star, i) => {
                  const ratingValue = i + 1;
                  return (
                    <label htmlFor="">
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        hidden
                      />
                      <i
                        className="fa fa-star fa-2x"
                        aria-hidden="true"
                        style={{
                          color:
                            ratingValue <= (hover || rating)
                              ? "#ffc107"
                              : "#e4e5e9",
                        }}
                        onClick={() => setRating(ratingValue)}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                      ></i>
                    </label>
                  );
                })}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="submit">
                <img src="/icons/send 1.png" alt="" />
                <p>GỬI</p>
              </Button>
            </div>
          </form>
          <div className="center">
            <Button buttonStyle="btn--yellow">
              <p>BÁO CÁO BÀI ĐĂNG</p>
            </Button>
            <p style={{ color: "red" }}>{notiComment}</p>
          </div>
        </Section>
      </div>
    </div>
  );
}

export default RoomDetail;
