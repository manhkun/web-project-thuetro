import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import houseApi from "../api/houseApi";
import { PostedItem } from "../components/PostItem";
import Section from "../components/Section";
import convertTime from "../helper/convertTime";

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

function Favorite() {
  const [listHouse, setListHouse] = useState([]);
  useEffect(async () => {
    let res = await houseApi.getListFavorite();
    setListHouse(res.data);
  }, []);

  return (
    <div>
      <Section sectionStyle="title--left" title="TIN ĐÃ LƯU"></Section>
      {listHouse.map((item) => {
        return (
          <PostedItem
            img={item.image_link[0]}
            title={item.header}
            price={price(item)}
            time={convertTime(item.post_time)}
            location={`${item.address.street}, ${item.address.commune}, ${item.address.district}, ${item.address.province}`}
            expired={convertTime(item.expired_time)}
            id={item.house_id}
          ></PostedItem>
        );
      })}
    </div>
  );
}

export default Favorite;
