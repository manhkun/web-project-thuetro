import React from "react";
import { Line } from "react-chartjs-2";

export const Chart = ({ data, xAxis, title }) => {
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
