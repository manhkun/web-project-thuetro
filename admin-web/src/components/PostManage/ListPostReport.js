import React from "react";
import convertTime from "../../helper/convertTime";

import { PostReportItem } from "./PostItem";
import { price } from "../../helper/convertPrice";

export const ListPostReport = ({ data }) => {
  console.log(data);
  return (
    <div>
      {data.map((item) => {
        return (
          <PostReportItem
            reportid={item.report_id}
            houseid={item.house.house_id}
            img={item.house.image_link[0]}
            title={item.house.header}
            reason={item.house.admin_comment}
            price={price(item.house)}
            create_at={convertTime(item.house.post_time)}
            location={`${item.house.address.street} - ${item.house.address.commune} - ${item.house.address.district} - ${item.house.address.province}`}
          ></PostReportItem>
        );
      })}
    </div>
  );
};
