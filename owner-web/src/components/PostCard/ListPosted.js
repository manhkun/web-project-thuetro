import React from "react";
import { PostedItem } from "./PostItem";

export const ListPosted = ({ data }) => {
  return (
    <div>
      {data.map((item, key) => {
        return <PostedItem data={item} key={key}></PostedItem>;
      })}
    </div>
  );
};
