import { ShoppingOutlined, ToolOutlined } from "@ant-design/icons";
import Chart from "./Components/Chart";
import "./index.scss";
export default function Dashboard() {
  return (
    <div className="h-full dashboard">
      <h1 className="mb-8 text-2xl">Hi Tien!</h1>
      <div className="flex w-full gap-6">
        <div className="dashboard__block">
          <div className="flex flex-col text-xl">
            <div className="mb-1">Task Bids Won</div>
            <div className="text-2xl font-bold ">22</div>
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
      <div className="dashboard__chart">
        <div className="mb-3 text-xl font-medium"> Your Profile Views</div>
        <Chart />
      </div>
    </div>
  );
}
