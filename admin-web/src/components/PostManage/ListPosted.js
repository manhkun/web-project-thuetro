import React from "react";
import { PostedItem } from "./PostItem";

export const ListPosted = ({ data }) => {
  console.log(data);
  return (
    <div>
      {data.map((item) => {
        return <PostedItem data={item} />;
      })}
    </div>
  );
};
