import React from "react";
import { Line, Bar } from "react-chartjs-2";

export const ChartLine = ({ data, xAxis, title }) => {
  const value = {
    labels: xAxis,
    datasets: [
      {
        data: data,
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
            text: title,
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
export const ChartBar = ({ data, xAxis, title }) => {
  const value = {
    labels: xAxis,
    datasets: [
      {
        label: "Lượt tìm kiếm",
        backgroundColor: [
          "#3e95cd",
          "#8e5ea2",
          "#3cba9f",
          "#e8c3b9",
          "#c45850",
        ],
        data: data,
      },
    ],
  };
  return (
    <div>
      <Bar
        data={value}
        options={{
          legend: { display: false },
          title: {
            display: true,
            text: title,
          },
        }}
      />
    </div>
  );
};
