import React from "react";
import { Line } from "react-chartjs-2";

export const Chart = ({ data }) => {
  const value = {
    labels: [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
    ],
    datasets: [
      {
        data: [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
        ],
        borderColor: "#e54f6d",
        label: "Lượt xem",
        fill: true,
      },
    ],
  };
  return (
    <div>
      <Line
        data={value}
        options={{
          title: {
            display: true,
            text: "Thống kê lượt xem theo giờ",
          },
          legend: {
            display: true,
            position: "bottom",
          },
        }}
      />
    </div>
  );
};
