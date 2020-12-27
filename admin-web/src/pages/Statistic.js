import React, { useEffect, useState } from "react";
import "./PostManage.css";

import Section from "../components/Section";
import { ChartBar, ChartLine } from "../components/Statistic/Chart";
import statisticApi from "../api/statisticApi";
import { MostView, MostLike } from "../components/Statistic/MostView";

function Statistic() {
  const [tabActive, setTabActive] = useState("1");
  const [loading, setLoading] = useState(false);
  const [viewInHourChart, setViewInHourChart] = useState([]);
  const [viewInDayChart, setViewInDayChart] = useState([]);
  const [mostViewInMonth, setMostViewInMonth] = useState([]);
  const [mostLikeInMonth, setMostLikeInMonth] = useState([]);
  const [mostSearchPrice, setMostSearchPrice] = useState([]);

  const [mostSearchPlace, setMostSearchPlace] = useState([]);
  const [placeMostSearch, setPlaceMostSearch] = useState([]);

  const viewsInHour = [];
  const viewsInDay = [];

  const searchPrice = [];
  const searchPriceRange = [
    "Duới 1Tr",
    "Từ 1Tr - 2Tr",
    "Từ 2Tr - 3Tr5",
    "Từ 3Tr - 5Tr",
    "Trên 5Tr",
  ];

  const mostSearchPlaceTemp = [];
  const placeMostSearchTemp = [];

  useEffect(async () => {
    let timeLine = await statisticApi.getTimeLine();
    if (timeLine.code === 200) {
      Object.values(timeLine.data).map((item) => {
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
    let mostView = await statisticApi.getMostView();
    if (mostView.code === 200) {
      setMostViewInMonth(mostView.data);
    }
    let mostLike = await statisticApi.getMostLike();
    if (mostLike.code === 200) {
      setMostLikeInMonth(mostLike.data);
    }
    let mostSearch = await statisticApi.getMostSearchPrice();
    if (mostSearch.code === 200) {
      Object.values(mostSearch.data).map((value) => {
        searchPrice.push(value);
      });
      setMostSearchPrice(searchPrice);
    }
    let mostSearchPl = await statisticApi.getMostSearchPlace();
    if (mostSearchPl.code === 200) {
      mostSearchPl.data.map((item) => {
        mostSearchPlaceTemp.push(item["number"]);
        placeMostSearchTemp.push(item["location"]);
      });
      setMostSearchPlace(mostSearchPlaceTemp);
      setPlaceMostSearch(placeMostSearchTemp);
    }
    setLoading(true);
  }, []);
  let tab;
  if (loading) {
    switch (tabActive) {
      case "1":
        tab = <MostView data={mostViewInMonth}></MostView>;
        break;
      case "2":
        tab = (
          <div>
            <ChartLine
              data={viewInHourChart}
              xAxis={Array.from(Array(24).keys())}
              title="Thống kê lượt xem theo giờ trong ngày"
            />{" "}
            <ChartLine
              data={viewInDayChart}
              xAxis={Array.from({ length: 30 }, (_, i) => i + 1)}
              title="Thống kê lượt xem theo ngày trong tháng"
            ></ChartLine>
          </div>
        );
        break;
      case "3":
        tab = <MostLike data={mostLikeInMonth} />;
        break;
      case "4":
        tab = (
          <ChartBar
            data={mostSearchPlace}
            xAxis={placeMostSearch}
            title={"Thống kê khu vực tìm kiếm nhiều nhất"}
          />
        );
        break;
      case "5":
        tab = (
          <ChartBar
            data={mostSearchPrice}
            xAxis={searchPriceRange}
            title={"Thống kê lượng tìm kiếm theo khoảng giá"}
          />
        );
        break;
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
