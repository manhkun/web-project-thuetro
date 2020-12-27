import React, { useEffect, useState } from "react";
import "./Home.css";

import CardItem from "../components/Helpers/CardItem/CardItem";

import Section from "../components/Section";
import houseApi from "../api/houseApi";
import { price } from "../helper/convertPrice";
import { Search } from "../components/Search";
import { Button } from "../components/Helpers/Button/Button";

function Home() {
  const [listHouse, setListHouse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataSearch, setDataSearch] = useState({
    key: "",
    province: "",
    district: "",
    price: "",
    house_type: "",
    page: 0,
    count: 10,
  });

  useEffect(() => {
    const fetchData = async () => {
      let res = await houseApi.getAllHouse();
      if (res.code === 200) {
        setListHouse(res.data);
        setLoading(true);
      }
    };
    fetchData();
  }, []);

  const handleLoadMore = async () => {
    let count = dataSearch.count + 10;
    setDataSearch({ ...dataSearch, ...{ count: count } });
  };

  return (
    <div>
      <div className="hero-container">
        <img src="image/unnamed.jpg" alt="" />
      </div>
      <Section title="TÌM KIẾM" size="40%">
        <Search
          dataSearch={dataSearch}
          setDataSearch={setDataSearch}
          setListHouse={setListHouse}
        ></Search>
      </Section>
      <Section title="TIN ĐĂNG DÀNH CHO BẠN">
        <div className="grid-container">
          {loading && listHouse ? (
            listHouse.map((item, key) => {
              return (
                <CardItem
                  houseid={item.house_id}
                  title={item.header}
                  price={price(item)}
                  location={`${item.address.district} - ${item.address.province}`}
                  image={item.image_link[0]}
                  like={item.like}
                  view={item.view}
                  key={key}
                ></CardItem>
              );
            })
          ) : (
            <p>Loading</p>
          )}
        </div>
        <div className="center">
          <Button onClick={handleLoadMore}>Xem thêm</Button>
        </div>
      </Section>
    </div>
  );
}

export default Home;
