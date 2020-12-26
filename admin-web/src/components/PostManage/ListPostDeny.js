import React from "react";
import { PostDeniedItem } from "./PostItem";

export const ListPostDeny = ({ data }) => {
  console.log(data);
  return (
    <div>
      {data.map((item) => {
        return <PostDeniedItem data={item} />;
      })}
    </div>
  );
};
