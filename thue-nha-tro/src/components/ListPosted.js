import React from "react";
import { PostedItem } from "./PostItem";
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

export const ListPosted = ({ data }) => {
  return (
    <div>
      {data.map((item) => {
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
};
