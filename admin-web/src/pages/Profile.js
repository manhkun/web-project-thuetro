import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useParams } from "react-router-dom";

import Section from "../components/Section";
import { Button } from "../components/Helpers/Button/Button";
import { PostItem } from "../components/PostManage/PostItem";
import Modal from "../components/Modal";
import { FormInput } from "../components/FormInput";
import userApi from "../api/userApi";
import houseApi from "../api/houseApi";
import messageApi from "../api/messageApi";

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpenModalMessage, setIsOpenModalMessage] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(async () => {
    try {
      let user = await userApi.getInfoOwner(id);
      setUser(user.data);
      let post = await houseApi.getHouseByOwnerID(id);
      setPost(post.data);
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleSendMessage = async () => {
    let res = await messageApi.sendMessage(id, message);
    if (res.code === 200) {
      window.location.href = `/chat/${id}/${user.owner_full_name}`;
    }
  };
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
                  <h3>{user && user.owner_full_name}</h3>
                  <Button onClick={() => setIsOpenModalMessage(true)}>
                    Nhắn tin
                  </Button>
                  <Modal
                    open={isOpenModalMessage}
                    onClose={() => setIsOpenModalMessage(false)}
                    onClick={handleSendMessage}
                  >
                    <FormInput
                      placeholder="Nội dung"
                      onChange={(e) => setMessage(e.target.value)}
                    ></FormInput>
                  </Modal>
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
        {post.map((item) => {
          return <PostItem data={item}></PostItem>;
        })}
      </div>
    );
}

export default Profile;
