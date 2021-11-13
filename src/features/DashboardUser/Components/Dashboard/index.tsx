import { ShoppingOutlined, ToolOutlined } from '@ant-design/icons';
import { Badge, Select } from 'antd';
import Chart from './Components/Chart';
import ChartRadialBar from './Components/RadioChart';
import './index.scss';
export default function Dashboard() {
  const { Option } = Select;
  function handleSelect(value: any) {
    console.log(`selected ${value}`);
  }
  return (
    <div className="h-full dashboard">
      <h1 className="mb-8 text-2xl">Hi Tien!</h1>
      <div className="flex flex-wrap w-full gap-6">
        <div className="dashboard__block">
          <div className="flex flex-col text-xl">
            <div className="mb-1">Total Earning</div>
            <div className="text-2xl font-bold ">$ 12321</div>
          </div>
          <div className="dashboard__icon1">
            <ToolOutlined />
          </div>
        </div>
        <div className="dashboard__block">
          <div className="flex flex-col text-xl">
            <div className="mb-1">Jobs Applied</div>
            <div className="text-2xl font-bold ">4</div>
          </div>
          <div className="dashboard__icon2">
            <ShoppingOutlined />
          </div>
        </div>
        <div className="dashboard__block">
          <div className="flex flex-col text-xl">
            <div className="mb-1">Reviews</div>
            <div className="text-2xl font-bold">12</div>
          </div>
          <div className="dashboard__icon3">
            <ToolOutlined />
          </div>
        </div>
      </div>
      <div className="flex-wrap dashboard__chart">
        <div className="dashboard__chart__left">
          <div className="m-3 text-xl font-medium">Your Profile Views</div>
          <Chart />
        </div>
        <div className="dashboard__chart__right">
          <div className="m-3 text-xl font-medium">Static Analytics</div>
          <ChartRadialBar />
          <div className="flex flex-col justify-center">
            <div className="flex justify-between px-4 mt-4 text-lg">
              <div className="flex gap-2">
                <Badge color="#36c361" size="default" /> <p>Applied Jobs</p>
              </div>
              <div className="font-bold">123</div>
            </div>
            <div className="flex justify-between px-4 text-lg">
              <div className="flex gap-2">
                <Badge color="#2194ff" size="default" /> <p>Bookmarked Projects</p>
              </div>
              <div className="font-bold">123</div>
            </div>
            <div className="flex justify-between px-4 text-lg">
              <div className="flex gap-2">
                <Badge color="#FA6CA4" size="default" /> <p>Jobs Done</p>
              </div>
              <div className="font-bold">123</div>
            </div>
            <div className="flex justify-between px-4 text-lg">
              <div className="flex gap-2">
                <Badge color="#7B46BE" size="default" /> <p>Total Jobs</p>
              </div>
              <div className="font-bold">123</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
