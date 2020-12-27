import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useParams } from "react-router-dom";

import Section from "../components/Section";
import { PostItem } from "../components/PostCard/PostItem";
import userApi from "../api/userApi";
import houseApi from "../api/houseApi";
import { price } from "../helper/convertPrice";
import convertTime from "../helper/convertTime";

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let user = await userApi.getInfoOwner(id);
      if (user.code === 200) setUser(user.data);
      let post = await houseApi.getHouseByOwnerID(id);
      if (post.code === 200) {
        setPost(post.data.filter((item) => item.expired_time !== 0));
      }
      setLoading(true);
    };
    fetchData();
  }, []);
  if (!loading || !user) {
    return <p>Loading</p>;
  } else
    return (
      <div>
        <Section title="THÔNG TIN CÁ NHÂN" sectionStyle="section--validate" />
        <div className="info-profile-container">
          <div className="main-profile">
            <Section style={{ height: "170px" }}>
              <div className="name-avt">
                <img src="/icons/profile 1.png" alt="" />
                <div className="name">
                  <h3>{user.owner_full_name}</h3>
                </div>
              </div>
            </Section>
          </div>
          <div className="info-profile">
            <Section style={{ height: "170px" }}>
              <div className="info-details">
                <div className="evaluate-detail">
                  <img src="/icons/check-list 1.png" alt="" />
                  <p>Đánh giá: </p>
                  <div className="star-voted">
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </div>
                </div>
                <div className="address-detail">
                  <img src="/icons/placeholder 1.png" alt="" />
                  <p>
                    Địa chỉ: {user.address.commune} - {user.address.district} -{" "}
                    {user.address.province}
                  </p>
                </div>
                <div className="posted-count">
                  <img src="/icons/post 1.png" alt="" />
                  <p>Bài đăng: {post.length} bài</p>
                </div>
                <div className="phone-number">
                  <img src="/icons/phone 1.png" alt="" />
                  <p>Số điện thoại: {user.profile.phone_number}</p>
                </div>
              </div>
            </Section>
          </div>
        </div>
        <Section title="TIN ĐĂNG"></Section>
        {post.map((item, key) => {
          return (
            <PostItem
              img={item.image_link[0]}
              title={item.header}
              price={price(item)}
              time={convertTime(item.post_time)}
              location={`${item.address.street}, ${item.address.commune}, ${item.address.district}, ${item.address.province}`}
              expired={convertTime(item.expired_time)}
              id={item.house_id}
              key={key}
            ></PostItem>
          );
        })}
      </div>
    );
}

export default Profile;
