import React from "react";
import { PostedItem } from "./PostItem";
import convertTime from "../../helper/convertTime";

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
      <PostedItem
        img="/image/nhatro1.jpg"
        title="Nhà trọ giá rẻ"
        price="1.000.000đ"
        create_at="06/11/2000 20:20"
        location="Minh Côi - Hạ Hoà - Phú Thọ"
        expired="11/11/2000 20:20"
      ></PostedItem>
    </div>
  );
};
