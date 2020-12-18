import React, { useEffect, useState } from "react";
import "./Home.css";

import CardItem from "../components/CardItem";
import Section from "../components/Section";
import University from "../components/University";
import houseApi from "../api/houseApi";

let price = (data) => {
  switch (data.unit) {
    case 0:
      return data.price + "Đ/Tháng";
    case 1:
      return data.price * 3 + "Đ/Quý";
    case 2:
      return data.price * 12 + "Đ/Năm";
    default:
      return "";
  }
};

function Home() {
  const [listHouse, setListHouse] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    let res = await houseApi.getAllHouse();
    console.log(res);
    setListHouse(res.data);
    setLoading(true);
  }, []);

  return (
    <div>
      <div className="hero-container">
        <img src="image/unnamed.jpg" alt="" />
      </div>
      <Section title="KHÁM PHÁ" size="40%">
        <ul className="list-university">
          <li>
            <University pathImg="/image/logoDHQG.png"></University>
          </li>
          <li>
            <University pathImg="/image/logoDHQG.png"></University>
          </li>
          <li>
            <University pathImg="/image/logoDHQG.png"></University>
          </li>
        </ul>
      </Section>
      <Section title="TIN ĐĂNG DÀNH CHO BẠN">
        <div className="grid-container">
          {loading ? (
            listHouse.map((item) => {
              return (
                <CardItem
                  houseid={item.house_id}
                  title={item.header}
                  price={price(item)}
                  location={`${item.address.district} - ${item.address.province}`}
                  image={item.image_link[0]}
                  like={item.like}
                  view={item.view}
                ></CardItem>
              );
            })
          ) : (
            <p>Loading</p>
          )}
        </div>
      </Section>
    </div>
  );
}

export default Home;
