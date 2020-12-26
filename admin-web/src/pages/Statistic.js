import React, { useEffect, useState } from "react";
import "./PostManage.css";

import Section from "../components/Section";
import { Chart } from "../components/Chart";
import statisticApi from "../api/statisticApi";

function Statistic() {
  const [tabActive, setTabActive] = useState("1");
  const [loading, setLoading] = useState(true);
  const [viewInHourChart, setViewInHourChart] = useState([]);
  const [viewInDayChart, setViewInDayChart] = useState([]);

  const viewsInHour = [];
  const viewsInDay = [];

  useEffect(async () => {
    let views = await statisticApi.viewInHour();
    if (views.code === 200) {
      Object.values(views.data).map((item) => {
        viewsInHour.push(Object.values(item));
        var viewInDay = Object.values(item).reduce((a, b) => a + b, 0);
        viewsInDay.push(viewInDay);
      });
      var result = viewsInHour.reduce(
        (r, a) => a.map((b, i) => (r[i] || 0) + b),
        []
      );
      setViewInHourChart(result);
      setViewInDayChart(viewsInDay);
    }
  }, []);
  let tab;
  if (loading) {
    switch (tabActive) {
      case "1":
        break;
      case "2":
        tab = (
          <div>
            <Chart
              data={viewInHourChart}
              xAxis={Array.from(Array(23).keys())}
              title="Thống kê lượt xem theo giờ trong ngày"
            />{" "}
            <Chart
              data={viewInDayChart}
              xAxis={Array.from({ length: 30 }, (_, i) => i + 1)}
              title="Thống kê lượt xem theo ngày trong tháng"
            ></Chart>
          </div>
        );
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
