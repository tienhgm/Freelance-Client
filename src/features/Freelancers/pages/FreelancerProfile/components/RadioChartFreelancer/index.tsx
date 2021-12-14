import React from 'react';
import { RadialBar } from '@ant-design/charts';
interface IProps {
  freelancerAnalysis: any;
}
const ChartRadialBarFreelancer: React.FC<IProps> = ({ freelancerAnalysis }) => {
  var data = [
    {
      name: 'Total done job',
      total: freelancerAnalysis.totalDoneJobs,
      color: '#36c361',
    },
    {
      name: 'Total on time job',
      total: freelancerAnalysis.totalOnTimeJobs,
      color: '#2f54eb',
    },
    {
      name: 'Current applied job',
      total: freelancerAnalysis.currentAppliedJobs,
      color: '#FA6CA4',
    },
    {
      name: 'Total rejected job',
      total: freelancerAnalysis.totalRejectedJobs,
      color: '#722ed1',
    },
    {
      name: 'Total time removed from job',
      total: freelancerAnalysis.totalTimeRemovedFromJob,
      color: '#cf1322',
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

export default ChartRadialBarFreelancer;
