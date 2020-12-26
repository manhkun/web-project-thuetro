import React from "react";
import { PostPendingItem } from "./PostItem";

export const ListPostPending = ({ data }) => {
  console.log(data);
  return (
    <div>
      {data.map((item) => {
        return <PostPendingItem data={item}></PostPendingItem>;
      })}
    </div>
  );
};
