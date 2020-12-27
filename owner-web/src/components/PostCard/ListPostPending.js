import React from "react";
import { PostPendingItem } from "./PostItem";

import convertTime from "../../helper/convertTime";
import { price } from "../../helper/convertPrice";

export const ListPostPending = ({ data }) => {
  return (
    <div>
      {data.map((item) => {
        return (
          <PostPendingItem
            img={item.image_link[0]}
            title={item.header}
            price={price(item)}
            time={convertTime(item.post_time)}
            location={`${item.address.street}, ${item.address.commune}, ${item.address.district}, ${item.address.province}`}
            expired={convertTime(item.expired_time)}
            id={item.house_id}
          ></PostPendingItem>
        );
      })}
    </div>
  );
};
