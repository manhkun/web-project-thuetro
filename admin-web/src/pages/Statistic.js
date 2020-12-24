import React, { useEffect, useState } from "react";
import "./PostManage.css";

import Section from "../components/Section";
import { Chart } from "../components/Chart";
import statisticApi from "../api/statisticApi";

function Statistic() {
  const [tabActive, setTabActive] = useState("1");
  const [loading, setLoading] = useState(true);
  const [viewInHour, setViewInHour] = useState([]);

  useEffect(async () => {
    let views = await statisticApi.viewInHour();
    Object.keys(views.data).map((key, item) => {
      console.log(item + " " + key);
    });
  });
  let tab;
  if (loading) {
    switch (tabActive) {
      case "1":
        tab = <Chart />;
        break;
      case "2":
        // tab = <ListUserActive />;
        break;
      case "3":
      // tab = <ListUserBlocked />;
    }
  } else {
    tab = <p>Loading</p>;
  }
  return (
    <div>
      <Section sectionStyle="title--left" title="THỐNG KÊ">
        <div className="post-status-nav">
          <div
            className={`posted ${tabActive === "1" ? "active" : ""}`}
            onClick={() => setTabActive("1")}
          >
            xem nhiều nhất<span></span>
          </div>
          <div
            className={`"reject-post" ${tabActive === "2" ? "active" : ""}`}
            onClick={() => setTabActive("2")}
          >
            lưu lượng<span></span>
          </div>
          <div
            className={`"await-accept" ${tabActive === "3" ? "active" : ""}`}
            onClick={() => setTabActive("3")}
          >
            quan tâm nhiều nhất<span></span>
          </div>
          <div
            className={`"await-accept" ${tabActive === "4" ? "active" : ""}`}
            onClick={() => setTabActive("4")}
          >
            Khu vực<span></span>
          </div>
          <div
            className={`"await-accept" ${tabActive === "5" ? "active" : ""}`}
            onClick={() => setTabActive("5")}
          >
            Mức giá phổ biến<span></span>
          </div>
        </div>
      </Section>
      {tab}
    </div>
  );
}

export default Statistic;
