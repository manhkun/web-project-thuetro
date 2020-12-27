import React from "react";
import { PostedItem } from "./PostItem";
import convertTime from "../../helper/convertTime";
import { price } from "../../helper/convertPrice";

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
