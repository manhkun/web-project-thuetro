import React from "react";
import { PostReportItem } from "./PostItem";

export const ListPostReport = ({ data }) => {
  return (
    <div>
      {data.map((item) => {
        return <PostReportItem data={item} />;
      })}
    </div>
  );
};
