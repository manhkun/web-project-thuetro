import React, { useEffect, useState } from "react";
import "./PostManage.css";

import Section from "../components/Section";
import { ListPosted } from "../components/PostManage/ListPosted";
import { ListPostDeny } from "../components/PostManage/ListPostDeny";
import { ListPostPending } from "../components/PostManage/ListPostPending";
import houseApi from "../api/houseApi";
import { ListPostReport } from "../components/PostManage/ListPostReport";

function PostManage() {
  const [tabActive, setTabActive] = useState("1");
  const [loading, setLoading] = useState(false);
  const [postedHouse, setPostedHouse] = useState([]);
  const [deniedHouse, setDeniedHouse] = useState([]);
  const [inactiveHouse, setInactiveHouse] = useState([]);
  const [reportHouse, setReportHouse] = useState([]);
  const [expiredHouse, setExpiredHouse] = useState([]);

  useEffect(async () => {
    let housePosted = await houseApi.getHouseByOwnerID("admin");
    let housePending = await houseApi.getHousePending();
    let houseDenied = await houseApi.getDeniedHouse();
    let houseReport = await houseApi.getReportHouse();
    let houseExpired = await houseApi.getExperiedHouse();
    setPostedHouse(housePosted.data);
    setInactiveHouse(housePending.data);
    setDeniedHouse(houseDenied.data);
    setReportHouse(houseReport.data);
    setExpiredHouse(houseExpired.data);
    setLoading(true);
  }, []);
  let tab;
  if (loading) {
    switch (tabActive) {
      case "1":
        tab = <ListPosted data={postedHouse}></ListPosted>;
        break;
      case "2":
        tab = <ListPostDeny data={deniedHouse}></ListPostDeny>;
        break;
      case "3":
        tab = <ListPostPending data={inactiveHouse}></ListPostPending>;
        break;
      case "4":
        tab = <ListPostReport data={reportHouse}></ListPostReport>;
        break;
      case "4":
        tab = <ListPostReport data={reportHouse}></ListPostReport>;
        break;
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
            tin đã đăng<span> ({postedHouse.length})</span>
          </div>
          <div
            className={`"reject-post" ${tabActive === "2" ? "active" : ""}`}
            onClick={() => setTabActive("2")}
          >
            tin đã từ chối đăng<span> ({deniedHouse.length})</span>
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
            tin bị báo cáo<span> ({reportHouse.length})</span>
          </div>
          <div
            className={`"await-accept" ${tabActive === "4" ? "active" : ""}`}
            onClick={() => setTabActive("4")}
          >
            tin đã cho thuê<span> ({reportHouse.length})</span>
          </div>
        </div>
      </Section>
      {tab}
    </div>
  );
}

export default PostManage;
