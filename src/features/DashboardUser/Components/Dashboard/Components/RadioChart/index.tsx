import React, { useState, useEffect } from 'react';
import { RadialBar } from '@ant-design/charts';
interface IProps {
  totalAppliedJobs?: number;
  totalBookmarkedProjects?: number;
  totalTotalJobs?: number;
  totalJobsDone?: number;
}
const ChartRadialBar: React.FC = () => {
  var data = [
    {
      name: 'Applied Jobs',
      total: 522,
      color: '#36c361',
    },
    {
      name: 'Bookmarked Projects',
      total: 1478,
      color: '#2194ff',
    },
    {
      name: 'Jobs Done',
      total: 1111,
      color: '#FA6CA4',
    },
    {
      name: 'Total Jobs',
      total: 1478,
      color: '#7B46BE',
    },
  ];
  var config = {
    width: 244,
    height: 244,
    data: data,
    xField: 'name',
    yField: 'total',
    maxAngle: 270,
    radius: 0.8,
    innerRadius: 0.2,
    colorField: 'name',
    color: function color(_ref: any) {
      let name = _ref.name;
      //   @ts-ignore
      return data.find(function (d) {
        return d.name === name;
      }).color;
    },
  };
  return <RadialBar {...config} />;
};

export default ChartRadialBar;
