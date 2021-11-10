import React from "react";
import { Line } from "@ant-design/charts";

const Chart: React.FC = () => {
  const data = [
    {
      Date: "2020-09",
      value: 3,
    },
    {
      Date: "2020-10",
      value: 4,
    },
    {
      Date: "2020-11",
      value: 8,
    },
    {
      Date: "2020-12",
      value: 11,
    },
    {
      Date: "2021-01",
      value: 16,
    },
    {
      Date: "2021-02",
      value: 20,
    },
    {
      Date: "2021-03",
      value: 36,
    },
  ];
  var config = {
    data: data,
    xField: "Date",
    yField: "value",
    label: {},
    point: {
      size: 5,
      shape: "diamond",
      style: {
        fill: "white",
        stroke: "#5B8FF9",
        lineWidth: 2,
      },
    },
    tooltip: { showMarkers: false },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: "#000",
          fill: "red",
        },
      },
    },
    interactions: [{ type: "marker-active" }],
  };
  return <Line {...config} />;
};

export default Chart;
