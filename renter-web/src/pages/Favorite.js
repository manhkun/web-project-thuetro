import React, { useEffect, useState } from "react";
import houseApi from "../api/houseApi";
import { PostedItem } from "../components/PostItem";
import Section from "../components/Section";
import convertTime from "../helper/convertTime";
import { price } from "../helper/convertPrice";

function Favorite() {
  const [listHouse, setListHouse] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let res = await houseApi.getListFavorite();
      if (res.code === 200) setListHouse(res.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Section sectionStyle="title--left" title="TIN ĐÃ LƯU"></Section>
      {listHouse.map((item, key) => {
        return (
          <PostedItem
            img={item.image_link[0]}
            title={item.header}
            price={price(item)}
            time={convertTime(item.post_time)}
            location={`${item.address.street}, ${item.address.commune}, ${item.address.district}, ${item.address.province}`}
            expired={convertTime(item.expired_time)}
            id={item.house_id}
            key={key}
          ></PostedItem>
        );
      })}
    </div>
  );
}

export default Favorite;
