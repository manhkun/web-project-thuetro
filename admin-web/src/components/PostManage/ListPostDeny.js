import React from "react";
import convertTime from "../../helper/convertTime";

import { PostDeniedItem } from "./PostItem";

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

export const ListPostDeny = ({ data }) => {
  console.log(data);
  return (
    <div>
      {data.map((item) => {
        return (
          <PostDeniedItem
            houseid={item.house_id}
            img={item.image_link[0]}
            title={item.header}
            reason={item.admin_comment}
            price={price(item)}
            create_at={convertTime(item.post_time)}
            location={`${item.address.street} - ${item.address.commune} - ${item.address.district} - ${item.address.province}`}
          ></PostDeniedItem>
        );
      })}
    </div>
  );
};
