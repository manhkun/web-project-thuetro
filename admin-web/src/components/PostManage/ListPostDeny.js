import React from "react";
import convertTime from "../../helper/convertTime";

import { PostDeniedItem } from "./PostItem";
import { price } from "../../helper/convertPrice";

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
