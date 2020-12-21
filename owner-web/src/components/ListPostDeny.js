import React from "react";

import { PostDeniedItem } from "../components/PostItem";

export const ListPostDeny = ({ data }) => {
  console.log(data);
  return (
    <div>
      {data.map((item) => {
        return (
          <PostDeniedItem
            img={item.image_link[0]}
            title={item.header}
            reason={item.admin_comment}
          ></PostDeniedItem>
        );
      })}
    </div>
  );
};
