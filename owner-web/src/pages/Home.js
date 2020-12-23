import React, { useEffect, useState } from "react";
import "./Home.css";

import CardItem from "../components/CardItem";
import Section from "../components/Section";
import University from "../components/University";
import houseApi from "../api/houseApi";
import { price } from "../helper/convertPrice";

function Home() {
  const [listHouse, setListHouse] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    let res = await houseApi.getAllHouse();
    setListHouse(res.data);
    setLoading(true);
  }, []);

  return (
    <div>
      <div className="hero-container">
        <img src="image/unnamed.jpg" alt="" />
      </div>
      <Section title="KHÁM PHÁ" size="40%"></Section>
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
