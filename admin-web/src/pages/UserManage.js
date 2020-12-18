import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./PostManage.css";

import Section from "../components/Section";
import { ListUserPending } from "../components/UserManage/ListUserPending";
import { ListUserActive } from "../components/UserManage/ListUserActive";
import { ListUserBlocked } from "../components/UserManage/ListUserBlocked";
import userApi from "../api/userApi";

function UserManage() {
  const [tabActive, setTabActive] = useState("1");
  const [listUserPending, setListUserPending] = useState({});
  const [listUserActivated, setListUserActivated] = useState({});
  const [listUserDenied, setListUserDenied] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    let data = await userApi.getAllOwner();
    console.log(data.data);
    let userPending = data.data.filter((item) => item.activate !== true);
    let userActivated = data.data.filter((item) => item.activate === true);
    setListUserActivated(userActivated);
    setListUserPending(userPending);
    setLoading(true);
  }, []);
  let tab;
  if (loading) {
    switch (tabActive) {
      case "1":
        tab = <ListUserPending data={listUserPending} />;
        break;
      case "2":
        tab = <ListUserActive data={listUserActivated} />;
        break;
      case "3":
        tab = <ListUserBlocked />;
    }
  } else {
    tab = <p>Loading</p>;
  }
  return (
    <div>
      <Section sectionStyle="title--left" title="QUẢN LÝ TIN ĐĂNG">
        <div className="post-status-nav">
          <div
            className={`posted ${tabActive === "1" ? "active" : ""}`}
            onClick={() => setTabActive("1")}
          >
            tài khoản chờ duyệt<span>({listUserPending.length})</span>
          </div>
          <div
            className={`"reject-post" ${tabActive === "2" ? "active" : ""}`}
            onClick={() => setTabActive("2")}
          >
            tài khoản đã duyệt<span>({listUserActivated.length})</span>
          </div>
          <div
            className={`"await-accept" ${tabActive === "3" ? "active" : ""}`}
            onClick={() => setTabActive("3")}
          >
            tài khoản bị khoá<span></span>
          </div>
        </div>
      </Section>
      {tab}
    </div>
  );
}

export default UserManage;
