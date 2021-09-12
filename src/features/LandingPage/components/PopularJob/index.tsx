import { Link } from "react-router-dom";
import {
  CloudOutlined,
  EditOutlined,
  FileTextOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import "./index.scss";
export default function PopularJob() {
  return (
    <div className="popular">
      <div className="flex justify-center pt-4 title">Popular Job Categories</div>
      <div className="grid h-56 grid-cols-4 mt-6 px-36">
        <Link to="/" className=" box">
          <div>
            <CloudOutlined className="text-3xl" />
          </div>
          <div className="mt-3 text-lg box__total ">123</div>
          <div className="mt-3 text-lg box__title">
            Data Science & Analitycs
          </div>
          <div className="mt-3 text-base box__content ">
            Data Specialist / Scientist, Data Analyst & More
          </div>
        </Link>
        <Link to="/" className=" box">
          <div>
            <FileTextOutlined className="text-3xl" />
          </div>
          <div className="mt-3 text-lg box__total ">612</div>
          <div className="mt-3 text-lg box__title">Web & Software Dev</div>
          <div className="mt-3 text-base box__content ">
            Software Engineer, Web / Mobile Developer & More
          </div>
        </Link>
        <Link to="/" className=" box">
          <div>
            <LineChartOutlined className="text-3xl" />
          </div>
          <div className="mt-3 text-lg box__total ">798</div>
          <div className="mt-3 text-lg box__title">Bussiness Analyst</div>
          <div className="mt-3 text-base box__content ">
            Bussiness Analyst Engineer & More
          </div>
        </Link>
        <Link to="/" className=" box">
          <div>
            <EditOutlined className="text-3xl" />
          </div>
          <div className="mt-3 text-lg box__total ">254</div>
          <div className="mt-3 text-lg box__title">Graphics & Design</div>
          <div className="mt-3 text-base box__content ">
            Software Engineer, Web / Mobile Developer & More
          </div>
        </Link>
      </div>
      <div className="grid h-56 grid-cols-4 px-36">
        <Link to="/" className=" box">
          <div>
            <CloudOutlined className="text-3xl" />
          </div>
          <div className="mt-3 text-lg box__total ">123</div>
          <div className="mt-3 text-lg box__title">
            Data Science & Analitycs
          </div>
          <div className="mt-3 text-base box__content ">
            Data Specialist / Scientist, Data Analyst & More
          </div>
        </Link>
        <Link to="/" className=" box">
          <div>
            <FileTextOutlined className="text-3xl" />
          </div>
          <div className="mt-3 text-lg box__total ">612</div>
          <div className="mt-3 text-lg box__title">Web & Software Dev</div>
          <div className="mt-3 text-base box__content ">
            Software Engineer, Web / Mobile Developer & More
          </div>
        </Link>
        <Link to="/" className=" box">
          <div>
            <LineChartOutlined className="text-3xl" />
          </div>
          <div className="mt-3 text-lg box__total ">798</div>
          <div className="mt-3 text-lg box__title">Bussiness Analyst</div>
          <div className="mt-3 text-base box__content ">
            Bussiness Analyst Engineer & More
          </div>
        </Link>
        <Link to="/" className=" box">
          <div>
            <EditOutlined className="text-3xl" />
          </div>
          <div className="mt-3 text-lg box__total ">254</div>
          <div className="mt-3 text-lg box__title">Graphics & Design</div>
          <div className="mt-3 text-base box__content ">
            Software Engineer, Web / Mobile Developer & More
          </div>
        </Link>
      </div>
    </div>
  );
}
