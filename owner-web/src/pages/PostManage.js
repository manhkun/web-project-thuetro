import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./PostManage.css";

import Section from "../components/Section";
import { ListPosted } from "../components/PostCard/ListPosted";
import { ListPostDeny } from "../components/PostCard/ListPostDeny";
import { ListPostPending } from "../components/PostCard/ListPostPending";
import houseApi from "../api/houseApi";

function PostManage({ currentUser }) {
  const [tabActive, setTabActive] = useState("1");
  const [loading, setLoading] = useState(false);
  const [activeHouse, setActiveHouse] = useState([]);
  const [deniedHouse, setDeniedHouse] = useState([]);
  const [inactiveHouse, setInactiveHouse] = useState([]);
  const [rentedHouse, setRentedHouse] = useState([]);

  useEffect(async () => {
    let data = await houseApi.getHouseByOwnerID(currentUser.owner_name);
    let active = data.data.filter((item) => item.status === "activated");
    let denied = data.data.filter((item) => item.status === "denied");
    let inactived = data.data.filter((item) => item.status === "inactivated");
    let rented = data.data.filter((item) => item.rented === true);
    setActiveHouse(active);
    setDeniedHouse(denied);
    setInactiveHouse(inactived);
    setRentedHouse(rented);
    setLoading(true);
  }, []);
  let tab;
  if (loading) {
    console.log(activeHouse);
    switch (tabActive) {
      case "1":
        tab = <ListPosted data={activeHouse}></ListPosted>;
        break;
      case "2":
        tab = <ListPostDeny data={deniedHouse}></ListPostDeny>;
        break;
      case "3":
        tab = <ListPostPending data={inactiveHouse}></ListPostPending>;
        break;
      case "4":
        tab = <ListPostPending data={rentedHouse}></ListPostPending>;
        break;
    }
  } else {
    tab = <p>Loading</p>;
  }
  return (
    <div>
      <Section sectionStyle="title--left" title="QUẢN LÝ TIN ĐĂNG" />
      <Section>
        <div className="profile">
          <img src="icons/profile 1.png" alt="" />
          <div className="profile-detail">
            <div className="name">{currentUser.owner_full_name}</div>
            <Link to={`/profile/${currentUser.owner_name}`}>
              Xem trang cá nhân của bạn
            </Link>
          </div>
        </div>
        <div className="post-status-nav">
          <div
            className={`posted ${tabActive === "1" ? "active" : ""}`}
            onClick={() => setTabActive("1")}
          >
            tin đã đăng<span> ({activeHouse.length})</span>
          </div>
          <div
            className={`"reject-post" ${tabActive === "2" ? "active" : ""}`}
            onClick={() => setTabActive("2")}
          >
            tin bị từ chối đăng<span> ({deniedHouse.length})</span>
          </div>
          <div
            className={`"await-accept" ${tabActive === "3" ? "active" : ""}`}
            onClick={() => setTabActive("3")}
          >
            tin chờ duyệt<span> ({inactiveHouse.length})</span>
          </div>
          <div
            className={`"await-accept" ${tabActive === "4" ? "active" : ""}`}
            onClick={() => setTabActive("4")}
          >
            tin đã cho thuê<span> ({rentedHouse.length})</span>
          </div>
        </div>
      </Section>
      {tab}
    </div>
  );
}

export default PostManage;
