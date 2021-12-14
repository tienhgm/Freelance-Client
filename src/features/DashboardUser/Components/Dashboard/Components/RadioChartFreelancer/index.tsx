import React from 'react';
import { RadialBar } from '@ant-design/charts';
interface IProps {
  userAnalysis: any;
}
const ChartRadialBarFreelancer: React.FC<IProps> = ({ userAnalysis }) => {
  var data = [
    {
      name: 'The lowest salary earned',
      total: userAnalysis.lowestJobSalary,
      color: '#FA6CA4',
    },
    {
      name: 'The highest salary earned',
      total: userAnalysis.highestJobSalary,
      color: '#2194ff',
    },
    {
      name: 'Total salary earned',
      total: userAnalysis.totalSalary,
      color: '#36c361',
    },
  ];
  var config = {
    width: 244,
    height: 244,
    data: data,
    xField: 'name',
    yField: 'total',
    maxAngle: 270,
    radius: 0.7,
    innerRadius: 0.3,
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

export default ChartRadialBarFreelancer;
