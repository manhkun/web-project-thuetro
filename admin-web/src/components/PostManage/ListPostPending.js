import React from "react";
import { PostPendingItem } from "./PostItem";

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

export const ListPostPending = ({ data }) => {
  return (
    <div>
      {data.map((item) => {
        return (
          <PostPendingItem
            houseid={item.house_id}
            img={item.image_link[0]}
            title={item.header}
            price={price(item)}
            create_at={convertTime(item.post_time)}
            location={`${item.address.street} - ${item.address.commune} - ${item.address.district} - ${item.address.province}`}
          ></PostPendingItem>
        );
      })}
    </div>
  );
};
