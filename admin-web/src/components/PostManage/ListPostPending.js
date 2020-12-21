import React from "react";
import { PostPendingItem } from "./PostItem";

import convertTime from "../../helper/convertTime";
import { price } from "../../helper/convertPrice";

export const ListPostPending = ({ data }) => {
  console.log(data);
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
