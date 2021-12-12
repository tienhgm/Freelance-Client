import React from 'react';
import { RadialBar } from '@ant-design/charts';
interface IProps {
  companyAnalysis: any;
}
const ChartRadialBar: React.FC<IProps> = ({ companyAnalysis }) => {
  var data = [
    {
      name: 'The lowest salary pay',
      total: companyAnalysis.lowestJobSalaryPay,
      color: '#FA6CA4',
    },
    {
      name: 'The highest salary pay',
      total: companyAnalysis.highestJobSalaryPay,
      color: '#2194ff',
    },
    {
      name: 'Total salary pay',
      total: companyAnalysis.totalSalaryPay,
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

export default ChartRadialBar;
